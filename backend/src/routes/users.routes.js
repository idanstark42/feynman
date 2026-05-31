import { Router } from "express"

import auth from "../middleware/auth.js"
import usersController from "../controllers/users.controller.js"

import { requireRole } from "../middleware/roles.js"
import { ROLES } from "../constants/roles.js"

const router = Router()

/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: Get current user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
router.get("/me", auth, usersController.getMe)

/**
 * @openapi
 * /users/me:
 *   patch:
 *     summary: Update current user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 */
router.patch("/me", auth, usersController.updateMe)

/**
 * @openapi
 * /users/me:
 *   delete:
 *     summary: Delete current user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 */
router.delete("/me", auth, usersController.deleteMe)

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden
 */
router.get("/", auth, requireRole(ROLES.ADMIN), usersController.getAll)

/**
 * @openapi
 * /users/{id}/role:
 *   patch:
 *     summary: Update user role (admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.patch("/:id/role", auth, requireRole(ROLES.ADMIN), usersController.updateRole)

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete user (admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.delete("/:id", auth, requireRole(ROLES.ADMIN), usersController.deleteUser)

export default router