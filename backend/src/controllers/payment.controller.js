import paymentService from "../services/payment.service.js"
import Controller from "./controller.js"

class PaymentController extends Controller {
  async payForVideo(req, res, next) {
    this.endpoint(async () => {
      const { videoId, amount } = req.body
      const result = await paymentService.createPaymentIntent(req.user._id, videoId, amount)

      return { redirectUrl: result.redirectUrl }
    }, next)
  }

  async callback(req, res, next) {
    this.endpoint(async () => {
      const { order_id } = req.query
      await paymentService.markAsPaid(order_id)
      return { message: "Payment confirmed" }
    }, next)
  }
}

export default new PaymentController()
