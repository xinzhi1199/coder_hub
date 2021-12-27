const service = require('../service/label.service')

const verifyLabelExists = async(ctx, next) => {
    console.log('middleware--verifyLabelExists');
    // 获取参数
    const { labels } = ctx.request.body;
    console.log('labels---', labels);

    // 2.判断每一个标签在label表中是否存在
    const newLabels = [];
    for (const name of labels) {
        const labelResult = await service.getLabelByName(name);
        console.log('labelResult', labelResult);
        const label = { name };
        if (!labelResult) {
            const result = await service.create(name);
            console.log('result', result);
            label.id = result.insertId;
        } else {
            label.id = labelResult.id;
        }
        newLabels.push(label);
    }
    console.log('newLabels---', newLabels);
    ctx.labels = newLabels;
    await next();
}

module.exports = {
    verifyLabelExists
};
