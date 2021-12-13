class UserService {
  async create(user) {
    // 将user储存到数据库

    return "创建用户成功"
  }
}

module.exports = new UserService();
