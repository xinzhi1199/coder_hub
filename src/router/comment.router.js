const Router = require('koa-router');

const {
    create,
    reply,
    update,
    remove,
    list
} = require('../controller/comment.controller');
const {
  verifyAuth
} = require('../middleware/auth.middleware');

const commentRouter = new Router({prefix: '/comment'});

// 发表评论
commentRouter.post('/', verifyAuth, create);
commentRouter.post('/:commentId/reply', verifyAuth, reply);

// 修改评论
commentRouter.patch('/:commentId', verifyAuth, update);

// 删除评论
commentRouter.delete('/:commentId', verifyAuth, remove);

// 获取评论列表
commentRouter.get('/', verifyAuth, list);

module.exports = commentRouter;