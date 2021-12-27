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
            JSON_OBJECT('id', u.id, 'name', u.name) user,
            (SELECT IF(
                        COUNT(c.id),
                        JSON_ARRAYAGG(
                          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt)
                        ),
                        NULL
						          ) FROM comment c WHERE m.id = c.moment_id
	          ) comments
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
            JSON_OBJECT('id', u.id, 'name', u.name) user,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
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

    async hasLabel(momentId, labelId) {
        const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
        const [result] = await connection.execute(statement, [
            momentId,
            labelId
        ]);
        return result[0] ? true : false;
    }

    async addLabel(momentId, labelId) {
        const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
        const [result] = await connection.execute(statement, [
            momentId,
            labelId
        ]);
        return result;
    }
}

module.exports = new MomentService();