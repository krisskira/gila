import { type User } from "./entities/user.entity"

export interface NotificationProvider {
  code: string
  notify: (user: User, message: string, categoryCode: string) => Promise<void>
}
