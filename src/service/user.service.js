const connection = require('../app/database');

class UserService {
  async create(user) {
    const {name, password} = user;

    // 将user储存到数据库
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;

    const result = await connection.execute(statement, [name, password]);

    console.log(result);

    return result[0];

    // return "创建用户成功"
  }
}

module.exports = new UserService();
