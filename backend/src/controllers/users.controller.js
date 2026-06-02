import userService from "../services/user.service.js"
import { ROLES } from "../constants/roles.js"
import endpoint from "./endpoint.js"

class UsersController {
  async getMe(req, res) {
    return endpoint(() => ({ user: req.user }), next)
  }

  async getAll(req, res, next) {
    endpoint(async () => {
      const users = await userService.getAllUsers()
      return { data: users }
    }, next)
  }

  async updateMe(req, res, next) {
    endpoint(async () => {
      const updated = await userService.updateUser(req.user._id, req.body)
      return { data: updated }
    }, next)
  }

  async deleteMe(req, res, next) {
    endpoint(async () => {
      await userService.deleteUser(req.user._id)
    }, next)
  }

  async deleteUser(req, res, next) {
    endpoint(async () => {
      await userService.deleteUser(req.params.id)
    }, next)
  }

  async updateRole(req, res, next) {
    endpoint(async () => {
      const updated = await userService.updateUser(req.params.id, { role: req.body.role || ROLES.USER })
      return { data: updated }
    }, next)
  }
}

export default new UsersController()