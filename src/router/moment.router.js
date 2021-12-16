const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });

const { create, detail } = require('../controller/moment.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

// 发表动态
momentRouter.post('/', verifyAuth, create);

// 动态列表


// 查询单个动态详情
momentRouter.get('/:momentId', detail);

module.exports = momentRouter;
