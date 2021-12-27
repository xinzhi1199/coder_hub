const Router = require('koa-router');

const {
  verifyAuth
} = require('../middleware/auth.middleware');
const { create, list } = require('../controller/label.controller');

const labelRouter = new Router({ prefix: '/label' });

// add
labelRouter.post('/', verifyAuth, create);

labelRouter.get('/list', list);

module.exports = labelRouter;