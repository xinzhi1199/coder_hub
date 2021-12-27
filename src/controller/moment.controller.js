const momentService = require('../service/moment.service');
const labelService = require('../service/label.service');
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

    async remove(ctx, next) {
        // 获取参数
        const momentId = ctx.params.momentId;
        // 执行数据库插入
        const result = await momentService.remove(momentId);
        ctx.body = result;
    }

    async addLabels(ctx, next) {
        // 获取参数
        const momentId = ctx.params.momentId;
        const { labels } = ctx;

        // 添加所有标签
        for (const label of labels) {
            // 判断标签和动态是否已有关系
            const isExist = await momentService.hasLabel(momentId, label.id);
            if (!isExist) {
                // 插入标签
                await momentService.addLabel(momentId, label.id);
            }
        }

        ctx.body = "给动态添加标签成功~";
    }
}

module.exports = new MomentController();
