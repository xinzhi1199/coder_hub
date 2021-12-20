const momentService = require('../service/moment.service');

class MomentController {
    async create(ctx, next) {
        // 获取参数
        const userId = ctx.user.id;
        const { content } = ctx.request.body;

        // 执行数据库插入
        const result = await momentService.create(userId, content);
        ctx.body = result;
    }

    async detail(ctx, next) {
        // 获取参数
        const momentId = ctx.params.momentId;

        // 执行数据库插入
        const result = await momentService.getMomentById(momentId);
        ctx.body = result;
    }

    async list(ctx, next) {
        // 获取参数
        const { offset, size } = ctx.query;

        // 执行数据库插入
        const result = await momentService.getMomentList(offset, size);
        ctx.body = result;
    }

    async update(ctx, next) {
        // 获取参数
        const momentId = ctx.params.momentId;
        const { content } = ctx.request.body;

        // 执行数据库插入
        const result = await momentService.update(content, momentId);
        ctx.body = result;
    }
}

module.exports = new MomentController();
