const userService = require('../service/user.service');
const errorTypes = require('../constants/error-types');
const md5password = require('../utils/password-handle');

const verifyLogin = async (ctx, next) => {
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
    await next();
};

module.exports = {
    verifyLogin
};
