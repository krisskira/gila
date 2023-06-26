import path from "path"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import { apiV0 } from "../routes"

const frontendPath = path.join(__dirname, "/../../../", "statics")

export const server = express()

server.use(morgan("dev"))
server.use(cors())
server.use(express.json())
server.use(
  express.urlencoded({
    extended: false,
  })
)

server.use("/api/v1.0", apiV0)
server.use(express.static(frontendPath, { index: "index.html" }))

export default server
