import User from "../models/User.js"

class UserRepository {
  async create(data) {
    return User.create(data)
  }

  async findById(id) {
    return User.findById(id)
  }

  async findByStytchId(stytchUserId) {
    return User.findOne({ stytchUserId })
  }

  async findAll() {
    return User.find()
  }

  async update(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id) {
    return User.findByIdAndDelete(id)
  }
}

export default new UserRepository()
