import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import swaggerUi from "swagger-ui-express"

import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/users.routes.js"
import videoRoutes from "./routes/videos.routes.js"
import paymentRoutes from "./routes/payment.routes.js"

import errorHandler from "./middleware/errorHandler.js"

import swaggerSpec from "./docs/swagger.js"

const app = express()

app.use(helmet())
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

app.get("/health", (_, res) => {
  res.status(200).json({
    status: "ok"
  })
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(errorHandler)

export default app
