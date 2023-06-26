import EmailService from "./app/services/email.service"
import { NotificationService } from "./app/services/notification.service"
import PushNotificationService from "./app/services/push-notification.service"
import SMSService from "./app/services/sms.service"
import { AppConfig } from "./core/config"
import databaseInit from "./core/database/connections"
import server from "./core/server"
import { swaggerDocsApiV1 } from "./core/swagger"

async function bootstrap(): Promise<void> {
  await databaseInit()
  NotificationService.registerProvider(new EmailService())
  NotificationService.registerProvider(new SMSService())
  NotificationService.registerProvider(new PushNotificationService())

  server.listen(AppConfig.port, () => {
    console.log(
      `\n\n🚀 (${AppConfig.environment}) Api Running at ${AppConfig.domain}:${AppConfig.port}/\n`
    )
    swaggerDocsApiV1(server)
  })
}

bootstrap().catch((error) => {
  console.error("☠️", error)
})
