import SwaggerUI from "swagger-ui-express"
import swaggerJSDoc, { type Options } from "swagger-jsdoc"
import { type Application } from "express"
import AppConfig from "../config"
import path from "path"

const routesPath = path.join(__dirname, "../routes/")

const options: Options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gila API Documentation",
      version: "1.0.0",
      contact: {
        name: "Crhistian David Vergara Gomez",
        email: "krisskira@gmail.com",
        url: "https://www.linkedin.com/in/cristian-david-vergara-gomez/",
      },
      basePath: "/api/v1.0",
      host: ` ${AppConfig.domain}:${AppConfig.port}`,
    },
    tags: [
      { name: "Users" },
      { name: "Messages" },
      { name: "Categories News" },
      { name: "Channels" },
    ],
  },
  apis: [`${routesPath}**/*.routes.*`],
}

const spec = swaggerJSDoc(options)

export const swaggerDocsApiV1 = (app: Application): void => {
  app.use("/api/v1.0/docs", SwaggerUI.serve, SwaggerUI.setup(spec))
  app.use("/api/v1.0/docs.json", (_req, resp) => {
    resp.json(spec)
  })
  console.log(
    `\n📄 Api documentation available at ${AppConfig.domain}:${AppConfig.port}/api/v1.0/docs \n`
  )
}
