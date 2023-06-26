import { LogsModel } from "../../core/database/connections"
import { type MessageLog } from "../domain/entities/messageLog.entity"
import { type Repository } from "./repository"

export default class MessagesLogRepository implements Repository<MessageLog> {
  async getAll(): Promise<MessageLog[]> {
    const messages = await LogsModel.findAll({
      order: [["createdAt", "DESC"]],
    })
    return messages.map((m) => m.toJSON()) as MessageLog[]
  }

  async getOne(id: number): Promise<MessageLog> {
    throw new Error("Not implemented")
  }

  async save(message: MessageLog): Promise<string> {
    const model = await LogsModel.create({
      category: message.category,
      channel: message.channel,
      message: message.message,
      user: message.user,
    })
    return model.id?.toString() ?? ""
  }
}
