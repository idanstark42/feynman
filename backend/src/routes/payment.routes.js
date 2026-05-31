import { Router } from "express"
import auth from "../middleware/auth.js"
import paymentController from "../controllers/payment.controller.js"

const router = Router()

/**
 * @openapi
 * /payments/pay-video:
 *   post:
 *     summary: Pay for a video
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - videoId
 *             properties:
 *               videoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment initiated
 *       401:
 *         description: Unauthorized
 */
router.post("/pay-video", auth, paymentController.payForVideo)

/**
 * @openapi
 * /payments/callback:
 *   get:
 *     summary: Payment provider callback
 *     description: Handles external payment gateway redirect/callback.
 *     tags:
 *       - Payments
 *     responses:
 *       200:
 *         description: Callback processed
 */
router.get("/callback", paymentController.callback)

export default router