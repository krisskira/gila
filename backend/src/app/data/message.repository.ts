import {
  MessageModel,
  SubscriptionModel,
} from "../../core/database/connections"
import { type Message } from "../domain/entities/message.entity"
import { type Repository } from "./repository"

export default class MessageRepository implements Repository<Message> {
  async getAll(): Promise<Message[]> {
    const messages = await MessageModel.findAll({
      include: ["category"],
      order: [["createdAt", "DESC"]],
    })
    return messages.map<Message>((m) => ({
      createdAt: m.createdAt?.toISOString() ?? "",
      content: m.content,
      category: {
        code: m.category?.code ?? "",
        name: m.category?.name ?? "",
      },
    }))
  }

  async getOne(id: number): Promise<Message> {
    throw new Error("Not implemented")
  }

  async save(message: {
    categoryCode: string
    content: string
  }): Promise<string> {
    const categoryModel = await SubscriptionModel.findOne({
      where: { code: message.categoryCode },
    })
    if (!categoryModel) throw new Error("The category-code is not available")
    const model = await MessageModel.create({
      content: message.content,
    })
    await model.setCategory(categoryModel)
    return model.id?.toString() ?? ""
  }
}
