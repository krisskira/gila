import { type Channel } from "./channel.entity"
import { type Subscrition } from "./subscription.entity"

export interface User {
  id: string
  name: string
  email: string
  phoneNumber: string
  channels: Channel[]
  subscribed: Subscrition[]
}
