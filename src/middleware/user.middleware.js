const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')

const verifyUser = async(ctx, next) => {
  // 获取用户名 密码
  const { name, password } = ctx.request.body;

  // 判断不能为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断注册过没
  const result = await userService.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  await next()
}

module.exports = {
  verifyUser
}
