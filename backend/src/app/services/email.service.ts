import MessagesLogRepository from "../data/messagesLog.repository"
import { type User } from "../domain/entities/user.entity"
import { type NotificationProvider } from "../domain/notification-provider"

export default class EmailService implements NotificationProvider {
  readonly code = "EMAIL"

  async notify(
    user: User,
    message: string,
    categoryCode: string
  ): Promise<void> {
    const messageLogRepo = new MessagesLogRepository()
    try {
      // @todo Here has to put the real logic to send the notification
      await messageLogRepo.save({
        category:
          user.subscribed.find((us) => us.code === categoryCode)?.name ??
          categoryCode,
        channel:
          user.channels.find((us) => us.code === this.code)?.name ?? this.code,
        message,
        user: user.name,
      })
    } catch (error) {
      // @todo Here should be the error handling to the real notification service
      console.log(
        `Failed sending email notification to ${user.name}, ${user.email}`,
        error
      )
    }
  }
}
