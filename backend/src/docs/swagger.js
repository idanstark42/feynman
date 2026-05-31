import swaggerJSDoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Streaming Platform API",
      version: "1.0.0",
      description: "Netflix-like backend API"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./src/routes/*.js"]
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec