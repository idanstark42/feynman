import { Router } from "express"

import videosController from "../controllers/videos.controller.js"
import auth from "../middleware/auth.js"
import { requireRole } from "../middleware/roles.js"
import { ROLES } from "../constants/roles.js"
import { upload } from "../middleware/upload.js"

const router = Router()

/**
 * @openapi
 * /videos:
 *   get:
 *     summary: Get all videos
 *     tags:
 *       - Videos
 *     security:
 *       - bearerAuth: []
 */
router.get("/", auth, videosController.getAll)

/**
 * @openapi
 * /videos/{id}:
 *   get:
 *     summary: Get video by ID
 *     tags:
 *       - Videos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/:id", auth, videosController.getById)

/**
 * @openapi
 * /videos:
 *   post:
 *     summary: Create a video (admin only)
 *     tags:
 *       - Videos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - video
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 */
router.post("/", auth, requireRole(ROLES.ADMIN), upload.single("video"), videosController.create)

/**
 * @openapi
 * /videos/{id}:
 *   patch:
 *     summary: Update video (admin only)
 *     tags:
 *       - Videos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.patch("/:id", auth, requireRole(ROLES.ADMIN), videosController.update)

/**
 * @openapi
 * /videos/{id}:
 *   delete:
 *     summary: Delete video (admin only)
 *     tags:
 *       - Videos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.delete("/:id", auth, requireRole(ROLES.ADMIN), videosController.delete)

export default router