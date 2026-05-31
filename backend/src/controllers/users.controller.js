import userService from "../services/user.service.js"
import { ROLES } from "../constants/roles.js"

class UsersController {
  async getMe(req, res) {
    return this.endpoint(() => ({ user: req.user }), next)
  }

  async getAll(req, res, next) {
    this.endpoint(async () => {
      const users = await userService.getAllUsers()
      return { data: users }
    }, next)
  }

  async updateMe(req, res, next) {
    this.endpoint(async () => {
      const updated = await userService.updateUser(req.user._id, req.body)
      return { data: updated }
    }, next)
  }

  async deleteMe(req, res, next) {
    this.endpoint(async () => {
      await userService.deleteUser(req.user._id)
    }, next)
  }

  async deleteUser(req, res, next) {
    this.endpoint(async () => {
      await userService.deleteUser(req.params.id)
    }, next)
  }

  async updateRole(req, res, next) {
    this.endpoint(async () => {
      const updated = await userService.updateUser(req.params.id, { role: req.body.role || ROLES.USER })
      return { data: updated }
    }, next)
  }
}

export default new UsersController()