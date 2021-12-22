const service = require('../service/comment.service');

class CommentController {
    async create(ctx, next) {
        // 获取参数
        const { momentId, content } = ctx.request.body;
        const { id } = ctx.user;

        // 插入数据
        const result = await service.create(content, momentId, id);

        ctx.body = result;
    }

    async reply(ctx, next) {
        // 获取参数
        const { momentId, content } = ctx.request.body;
        const { id } = ctx.user;
        const { commentId } = ctx.params;

        // 插入数据
        const result = await service.reply(content, momentId, commentId, id);

        ctx.body = result;
    }

    async update(ctx, next) {
        // 获取参数
        const { content } = ctx.request.body;
        const { commentId } = ctx.params;

        // 插入数据
        const result = await service.update(content, commentId);

        ctx.body = result;
    }

    async remove(ctx, next) {
        // 获取参数
        const { commentId } = ctx.params;

        // 插入数据
        const result = await service.remove(commentId);

        ctx.body = result;
    }

    async list(ctx, next) {
        // 获取参数
        const { limit, offset } = ctx.query;

        // 插入数据
        const result = await service.list(limit, offset);

        ctx.body = result;
    }
}

module.exports = new CommentController();