import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + "-" + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const allowed = [
    "video/mp4",
    "video/mkv",
    "video/quicktime"
  ]

  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Invalid file type"), false)
  }

  cb(null, true)
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 500 // 500MB
  }
})
