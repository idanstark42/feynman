import { Router } from "express"

import videosController from "../controllers/videos.controller.js"
import auth from "../middleware/auth.js"
import { requireRole } from "../middleware/roles.js"
import { ROLES } from "../constants/roles.js"

const router = Router()

router.get("/", auth, videosController.getAll)
router.get("/upload-signature", auth, requireRole(ROLES.ADMIN), videosController.getSignature);
router.get("/:id", auth, videosController.getById)
router.post("/", auth, requireRole(ROLES.ADMIN), videosController.create);
router.patch("/:id", auth, requireRole(ROLES.ADMIN), videosController.update)
router.delete("/:id", auth, requireRole(ROLES.ADMIN), videosController.delete)

export default router