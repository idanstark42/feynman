import User from "../models/User.js"

export async function canAccessVideo(req, res, next) {
  const user = req.user
  const videoId = req.params.id

  if (user.subscriptionType === "full_access") {
    return next()
  }

  const access = user.videoAccess.find(x => v.videoId.toString() === videoId && new Date(v.expiresAt) > new Date())

  if (!access) {
    return res.status(403).json({
      success: false,
      message: "Pay required for this video"
    })
  }

  next()
}