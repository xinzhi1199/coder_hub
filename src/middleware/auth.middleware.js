const jwt = require('jsonwebtoken');

const userService = require('../service/user.service');
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

module.exports = {
    verifyLogin,
    verifyAuth
};
