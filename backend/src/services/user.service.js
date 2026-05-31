import userRepository from "../repositories/user.repository.js";

class UserService {
  async getAllUsers() {
    return userRepository.findAll();
  }

  async getUser(id) {
    return userRepository.findById(id);
  }

  async updateUser(id, data) {
    return userRepository.update(id, data);
  }

  async deleteUser(id) {
    return userRepository.delete(id);
  }
}

export default new UserService();