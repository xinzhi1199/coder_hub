const connection = require('../app/database');

class CommentService {
    async create(content, momentId, userId) {
        console.log(content, momentId, userId);
        const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;
        const [result] = await connection.execute(statement, [
            content,
            momentId,
            userId
        ]);
        return result;
    }

    async reply(content, momentId, commentId, userId) {
        console.log(content, momentId, commentId, userId);
        const statement = `INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?, ?, ?, ?);`;
        const [result] = await connection.execute(statement, [
            content,
            momentId,
            commentId,
            userId
        ]);
        return result;
    }

    async update(content, commentId) {
        console.log(content, commentId);
        const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [
            content,
            commentId
        ]);
        return result;
    }

    async remove(commentId) {
        console.log('commentId', commentId);
        const statement = `DELETE FROM comment WHERE id = ?;`;
        const [result] = await connection.execute(statement, [commentId]);
        return result;
    }

    async list(limit, offset) {
        console.log(limit, offset);
        const statement = `SELECT * FROM comment LIMIT ?, ?;`;
        const [result] = await connection.execute(statement, [limit, offset]);
        return result;
    }
}

module.exports = new CommentService();