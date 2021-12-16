const jwt = require('jsonwebtoken');
const {
  PRIVITE_KEY
} = require('../app/config');

class AuthController {
    login(ctx, next) {
        // const { id, name } = ctx.request.body;
        const { id, name } = ctx.user;

        // 设置 token
        const token = jwt.sign({ id, name }, PRIVITE_KEY, {
            expiresIn: 60 * 60 * 24, //24h
            algorithm: 'RS256'
        });

        ctx.body = { id, name, token };
    }

    success(ctx, next) {
      ctx.body = "授权成功~"
    }
}

module.exports = new AuthController();
