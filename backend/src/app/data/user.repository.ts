import {
  MessageModel,
  SubscriptionModel,
  UserModel,
} from "../../core/database/connections"
import { type Message } from "../domain/entities/message.entity"
import { type User } from "../domain/entities/user.entity"
import { type Repository } from "./repository"

export type UserWithMessages = User & { messages: Message[] }

export default class UserRepository implements Repository<User> {
  async getAll(): Promise<UserWithMessages[]> {
    const userModels = await UserModel.findAll({
      include: [
        "subscribed",
        "channels",
        {
          model: MessageModel,
          as: "messages",
          include: ["category"],
          through: {
            attributes: ["channel"],
          },
        },
      ],
      order: [["messages", "createdAt", "DESC"]],
    })
    const users = userModels.map<UserWithMessages>(this.modelToObject)
    return users
  }

  async getOne(id: number): Promise<User> {
    throw new Error("Not implemented")
  }

  async getAllBySubscritionCode(code: string): Promise<User[]> {
    const userModels = await UserModel.findAll({
      include: [
        "channels",
        {
          model: SubscriptionModel,
          as: "subscribed",
          where: {
            code,
          },
        },
      ],
    })
    return userModels.map<UserWithMessages>(this.modelToObject)
  }

  async addMessage(userId: string, messageId: string): Promise<void> {
    const userModel = await UserModel.findByPk(userId)
    if (!userModel) {
      throw new Error("User not found")
    }

    await userModel?.addMessage(Number(messageId))
    await userModel.save()
  }

  private modelToObject(model: UserModel): UserWithMessages {
    return {
      id: model.id?.toString() ?? "",
      name: model.name,
      email: model.email,
      phoneNumber: model.phoneNumber,
      channels: model.channels?.map(({ name, code }) => ({ name, code })) ?? [],
      subscribed:
        model.subscribed?.map(({ name, code }) => ({ name, code })) ?? [],
      messages:
        model.messages?.map<Message>(
          ({ content, createdAt, category, UserMessages }) => ({
            channelCode: UserMessages?.channel,
            createdAt: createdAt?.toISOString() ?? "",
            content,
            category: {
              code: category?.code ?? "",
              name: category?.name ?? "",
            },
          })
        ) ?? [],
    }
  }
}
