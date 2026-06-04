import userService from "../services/user.service.js"
import { ROLES } from "../constants/roles.js"
import endpoint from "./endpoint.js"

class UsersController {
  async getMe(req, res) {
    return endpoint(() => ({ user: req.user }), res, next)
  }

  async getAll(req, res, next) {
    endpoint(async () => {
      const users = await userService.getAllUsers()
      return { data: users }
    }, res, next)
  }

  async updateMe(req, res, next) {
    endpoint(async () => {
      const updated = await userService.updateUser(req.user._id, req.body)
      return { data: updated }
    }, res, next)
  }

  async deleteMe(req, res, next) {
    endpoint(async () => {
      await userService.deleteUser(req.user._id)
    }, res, next)
  }

  async deleteUser(req, res, next) {
    endpoint(async () => {
      await userService.deleteUser(req.params.id)
    }, res, next)
  }

  async update(req, res, next) {
    endpoint(async () => {
      const updated = await userService.updateUser(req.params.id, req.body)
      return { data: updated }
    }, res, next)
  }
}

export default new UsersController()