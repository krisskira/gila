import { type Subscrition } from "./subscription.entity"

export interface Message {
  content: string
  category: Subscrition
  createdAt: string
  channelCode?: string
}
