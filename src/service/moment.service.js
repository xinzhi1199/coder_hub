const connection = require('../app/database');

class MomentService {
    async create(user_id, content) {
        const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`;
        const [result] = await connection.execute(statement, [user_id, content]);
        return result;
    }
}

module.exports = new MomentService();