export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async findByEmail(email) {
    return this.dao.findByEmail(email);
  }

  async findById(id) {
    return this.dao.findById(id);
  }

  async save(user) {
    return this.dao.save(user);
  }

  async updatePassword(email, newHashedPassword) {
    return this.dao.updatePassword(email, newHashedPassword);
  }
}
