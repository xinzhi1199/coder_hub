const jwt = require('jsonwebtoken');

const userService = require('../service/user.service');
const authService = require('../service/auth.service');
const errorTypes = require('../constants/error-types');
const md5password = require('../utils/password-handle');
const {
  PUBLIC_KEY
} = require('../app/config')

const verifyLogin = async (ctx, next) => {
    console.log("验证登录的middleware~");
    // 获取用户名 密码
    const { name, password } = ctx.request.body;

    // 判断不能为空
    if (!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }

    // 判断用户是否存在
    const result = await userService.getUserByName(name);
    const user = result[0]
    if (!user) {
        const error = new Error(errorTypes.USER_DOSE_NOT_EXISTS);
        return ctx.app.emit('error', error, ctx);
    }

    // 判断密码是否正确
    if (md5password(password) != user.password) {
      const error = new Error(errorTypes.PASSWORD_IS_INCORRECT);
      return ctx.app.emit('error', error, ctx);
    }

    ctx.user = user;
    await next();
};

const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware~");
  // 获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNZUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }
  const token = authorization.replace('Bearer ', '');

  // 验证token
  try {
      const result = jwt.verify(token, PUBLIC_KEY, {
          algorithms: ['RS256']
      });
      console.log('result', result);
      ctx.user = result;
      await next();
  } catch (err) {
      const error = new Error(errorTypes.UNZUTHORIZATION);
      return ctx.app.emit('error', error, ctx);
  }
};

const verifyAuthPermission = async(ctx, next) => {
    console.log('验证操作权限的middleware~');

    // 1. 获取参数
    const [resourceId] = Object.keys(ctx.params);
    const momentId = ctx.params[resourceId];
    const userId = ctx.user.id;
    const tableName = resourceId.replace('Id', '');

    // 2. 获取是否有权限
    try {
      const isPermission = await authService.checkResource(tableName, momentId, userId);
      if (!isPermission) {
        throw new Error();
      }
      await next();
    } catch (err) {
      const error = new Error(errorTypes.UNPERMISSION);
      return ctx.app.emit('error', error, ctx);
    }

}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyAuthPermission
};
