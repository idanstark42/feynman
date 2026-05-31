import Payment from "../models/Payment.js"
  import User from "../models/User.js"

class PaymentService {
  async createPaymentIntent(userId, videoId, amount) {
    const payment = await Payment.create({
      userId,
      amount,
      status: "pending"
    })

    const redirectUrl =
      `https://sumit.co.il/pay?` +
      `amount=${amount}&` +
      `order_id=${payment._id}&` +
      `callback_url=${process.env.BASE_URL}/api/payments/callback`

    return { payment, redirectUrl }
  }

  async markAsPaid(orderId) {
    return Payment.findByIdAndUpdate(
      orderId,
      { status: "paid" },
      { new: true }
    )
  }

  async grantVideoAccess(userId, videoId, duration) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + duration); // 7-day access

    await User.findByIdAndUpdate(userId, {
      $push: {
        videoAccess: {
            videoId,
            openedAt: new Date(),
            expiresAt
        }
      }
    });
  }
}



export default new PaymentService()
