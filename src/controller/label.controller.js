const service = require('../service/label.service')

class LabelController {
    async create(ctx, next) {
        // 获取参数
        const { name } = ctx.request.body;

        // 数据库处理
        const result = await service.create(name);
        ctx.body = result;
    }

    async list(ctx, next) {
        // 获取参数
        const { limit, offset } = ctx.query;

        // 数据库处理
        const result = await service.list(limit, offset);
        ctx.body = result;
    }
}

module.exports = new LabelController();
