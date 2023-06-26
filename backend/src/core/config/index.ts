import dotEnv from "dotenv"

dotEnv.config({
  override: true,
  debug: !!process.env.DEBUG,
})

export const AppConfig = {
  TZ: process.env.TZ,
  environment: process.env.DEBUG ? "dev" : "prod",
  port: process.env.PORT ?? 3000,
  enableDatabaseLogger: process.env.ENABLE_DATABASE_LOGGER === "1" ?? false,
  domain: process.env.SERVER_DOMAIN ?? "http://localhost",
}

export default AppConfig
