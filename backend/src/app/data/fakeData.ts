import { type Channel } from "../domain/entities/channel.entity"
import { type Message } from "../domain/entities/message.entity"
import { type Subscrition } from "../domain/entities/subscription.entity"
import { type User } from "../domain/entities/user.entity"

export const Subscriptions: Subscrition[] = [
  {
    code: "sports",
    name: "Deportes",
  },
  {
    code: "finance",
    name: "Finanzas",
  },
  {
    code: "movies",
    name: "Películas",
  },
  {
    code: "news",
    name: "Noticias",
  },
]

export const NotificationChannels: Channel[] = [
  {
    code: "SMS",
    name: "Mensaje de Texto",
  },
  {
    code: "PUSH_NOTIFICATION",
    name: "Notificación Push",
  },
  {
    code: "EMAIL",
    name: "Correo Eléctronico",
  },
]

export const Users: User[] = [
  {
    id: "1",
    name: "Crhistian Gomez",
    email: "krisskira@gmail.com",
    phoneNumber: "+573183919187",
    channels: [NotificationChannels[0], NotificationChannels[2]],
    subscribed: [Subscriptions[0], Subscriptions[1]],
  },
  {
    id: "2",
    name: "David Vergara",
    email: "david_vergara@gmail.com",
    phoneNumber: "+57318009100",
    channels: [NotificationChannels[0]],
    subscribed: [Subscriptions[0]],
  },
  {
    id: "3",
    name: "Pedro Perez",
    email: "pedro_perez@gmail.com",
    phoneNumber: "+573111119222",
    channels: [NotificationChannels[1], NotificationChannels[2]],
    subscribed: [Subscriptions[0], Subscriptions[1]],
  },
  {
    id: "4",
    name: "Juanita Crost",
    email: "jcost@gmail.com",
    phoneNumber: "+018881119444",
    channels: [NotificationChannels[2]],
    subscribed: [Subscriptions[0], Subscriptions[3]],
  },
  {
    id: "5",
    name: "Just Only",
    email: "jonly@gmail.com",
    phoneNumber: "+018881119444",
    channels: [NotificationChannels[2], NotificationChannels[1]],
    subscribed: [Subscriptions[3]],
  },
]

export const Messages: Message[] = [
  {
    createdAt: "2023-06-24T00:43:38.499Z",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates enim saepe magnam consequuntur, fugiat nobis dolores officia molestias voluptate aut recusandae sapiente blanditiis architecto labore ullam minus quos fuga maxime.",
    category: Subscriptions[0],
  },
]

export default {
  Subscriptions,
  NotificationChannels,
  Users,
  Messages
}
