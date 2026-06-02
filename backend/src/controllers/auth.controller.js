import stytchClient from "../config/stytch.js"
import User from "../models/User.js"
import endpoint from "./endpoint.js"

class AuthController {
  async login(req, res, next) {
    endpoint(async () => {
      const { sessionToken } = req.body

      const authResponse = await stytchClient.sessions.authenticate({ session_token: sessionToken })

      const stytchUser = authResponse.session.user_id
      const stytchUserData = await stytchClient.users.get({ user_id: stytchUser })

      const email = stytchUserData.emails?.[0]?.email
      let user = await User.findOne({ stytchUserId: stytchUser })

      if (!user) {
        user = await User.create({ stytchUserId: stytchUser, email })
      }

      return { user }
    }, next)
  }

  async me(req, res) {
    return endpoint(() => ({ user: req.user }), next)
  }
}

export default new AuthController()
