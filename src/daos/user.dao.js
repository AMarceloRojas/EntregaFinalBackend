import User from '../models/User.js';

export default class UserDAO {
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findById(id) {
    return await User.findById(id);
  }

  async save(userData) {
    return await User.create(userData);
  }

  async updatePassword(email, newHashedPassword) {
    return await User.findOneAndUpdate(
      { email },
      { password: newHashedPassword },
      { new: true }
    );
  }
}
