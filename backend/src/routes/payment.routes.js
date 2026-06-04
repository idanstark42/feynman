import { Router } from "express"
import auth from "../middleware/auth.js"
import paymentController from "../controllers/payment.controller.js"

const router = Router()

router.post("/pay-video", auth, paymentController.payForVideo)
router.get("/callback", paymentController.callback)

export default router