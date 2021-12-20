const connection = require('../app/database');

class MomentService {
    async create(user_id, content) {
        const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`;
        const [result] = await connection.execute(statement, [
            user_id,
            content
        ]);
        return result;
    }

    async getMomentById(momentId) {
        const statement = `
          SELECT 
            m.id id, m.content content, m.create_at createTime, m.update_at updateTime,
            JSON_OBJECT('id', u.id, 'name', u.name) user
          FROM moment m 
          LEFT JOIN user u ON m.user_id = u.id
          WHERE m.id = ?;
        `;
        const [result] = await connection.execute(statement, [momentId]);
        return result;
    }

    async getMomentList(offset, size) {
        const statement = `
          SELECT 
            m.id id, m.content content, m.create_at createTime, m.update_at updateTime,
            JSON_OBJECT('id', u.id, 'name', u.name) user
          FROM moment m 
          LEFT JOIN user u ON m.user_id = u.id
          limit ?, ?;
        `;
        const [result] = await connection.execute(statement, [offset, size]);
        return result;
    }

    async update(content, momentId) {
        const statement = `UPDATE moment SET content = ? WHERE id = ?`;
        const [result] = await connection.execute(statement, [
            content,
            momentId
        ]);
        return result;
    }

    async remove(momentId) {
        const statement = `DELETE FROM moment WHERE id = ?`;
        const [result] = await connection.execute(statement, [momentId]);
        return result;
    }
}

module.exports = new MomentService();