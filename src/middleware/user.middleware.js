const errorTypes = require('../constants/error-types')

const verifyUser = async(ctx, next) => {
  // 获取用户名 密码
  const { name, password } = ctx.request.body;

  // 判断不能为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断注册过没


  await next()
}

module.exports = {
  verifyUser
}
