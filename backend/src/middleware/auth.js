import stytchClient from "../config/stytch.js"
import User from "../models/User.js"

export default async function auth(req, res, next) {
  try {
    const sessionToken = req.headers.authorization?.replace("Bearer ", "")

    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      })
    }

    const response = await stytchClient.sessions.authenticate({
      session_token: sessionToken
    })

    const stytchUserId = response.session.user_id

    const user = await User.findOne({ stytchUserId })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      })
    }

    req.user = user

    next()
  } catch (error) {
    next(error)
  }
}
