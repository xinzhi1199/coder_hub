const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });

const {
    create,
    detail,
    list,
    update,
    remove,
    addLabels
} = require('../controller/moment.controller');
const { verifyAuth, verifyAuthPermission } = require('../middleware/auth.middleware');
const { verifyLabelExists } = require('../middleware/label.middleware');

// 发表动态
momentRouter.post('/', verifyAuth, create);

// 动态列表
momentRouter.get('/', list);

// 查询单个动态详情
momentRouter.get('/:momentId', detail);

// 修改 、 删除动态  1.必须登录  2.用户具备权限
// verifyPermission
momentRouter.patch('/:momentId', verifyAuth, verifyAuthPermission, update);
momentRouter.delete('/:momentId', verifyAuth, verifyAuthPermission, remove);

// 给动态添加标签
momentRouter.post(
    '/:momentId/labels',
    verifyAuth,
    verifyLabelExists,
    addLabels
);

module.exports = momentRouter;
