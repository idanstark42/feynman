import paymentService from "../services/payment.service.js"
import endpoint from "./endpoint.js"

class PaymentController {
  async payForVideo(req, res, next) {
    endpoint(async () => {
      const { videoId, amount } = req.body
      const result = await paymentService.createPaymentIntent(req.user._id, videoId, amount)

      return { redirectUrl: result.redirectUrl }
    }, res, next)
  }

  async callback(req, res, next) {
    endpoint(async () => {
      const { order_id } = req.query
      await paymentService.markAsPaid(order_id)
      return { message: "Payment confirmed" }
    }, res, next)
  }
}

export default new PaymentController()
