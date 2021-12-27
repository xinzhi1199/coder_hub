const connection = require('../app/database');

class LabelService {
    async create(name) {
        const statement = `INSERT INTO label (name) VALUES (?);`;
        const [result] = await connection.execute(statement, [name]);
        return result;
    }

    async list(limit, offset) {
        const statement = `SELECT * FROM label LIMIT ?, ?;`;
        const [result] = await connection.execute(statement, [offset, limit]);
        return result;
    }
}

module.exports = new LabelService();
