import { Router } from "express"

import auth from "../middleware/auth.js"
import usersController from "../controllers/users.controller.js"

import { requireRole } from "../middleware/roles.js"
import { ROLES } from "../constants/roles.js"

const router = Router()

router.get("/me", auth, usersController.getMe)
router.put("/me", auth, usersController.updateMe)
router.delete("/me", auth, usersController.deleteMe)
router.get("/", auth, requireRole(ROLES.ADMIN), usersController.getAll)
router.put("/:id", auth, requireRole(ROLES.ADMIN), usersController.update)
router.delete("/:id", auth, requireRole(ROLES.ADMIN), usersController.deleteUser)

export default router