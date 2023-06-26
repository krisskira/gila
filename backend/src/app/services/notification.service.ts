import { type User } from "../domain/entities/user.entity"
import { type NotificationProvider } from "../domain/notification-provider"

class NotificationHandler {
  private readonly providers: NotificationProvider[] = []
  registerProvider(provider: NotificationProvider): void {
    this.providers.push(provider)
  }

  async notify(
    users: User[],
    message: string,
    categoryCode: string
  ): Promise<number> {
    let counter = 0
    for (const user of users) {
      for (const channel of user.channels) {
        const provider = this.providers.find(
          (p) => p.code.toLowerCase() === channel.code.toLowerCase()
        )
        if (provider) counter++
        await provider?.notify(user, message, categoryCode)
      }
    }
    return counter
  }
}

export const NotificationService = new NotificationHandler()
