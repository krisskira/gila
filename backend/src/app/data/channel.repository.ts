import { ChannelModel } from "../../core/database/connections"
import { type Channel } from "../domain/entities/channel.entity"
import { type Repository } from "./repository"

export default class SubscriptionRepository implements Repository<Channel> {
  async getAll(): Promise<Channel[]> {
    const channelModels = await ChannelModel.findAll({
      order: [["name", "DESC"]],
    })

    const subscriptions = channelModels.map<Channel>((model) => ({
      code: model.code,
      name: model.name,
    }))

    return subscriptions
  }

  async getOne(id: number): Promise<Channel> {
    const model = await ChannelModel.findByPk(id)
    return {
      code: model?.code ?? "",
      name: model?.name ?? "",
    }
  }

  async getOneByCode(code: string): Promise<Channel> {
    const model = await ChannelModel.findOne({ where: { code } })
    return {
      code: model?.code ?? "",
      name: model?.name ?? "",
    }
  }

  async createNew(subscription: Channel): Promise<string> {
    const model = await ChannelModel.create(subscription)
    return model.id?.toString() ?? ""
  }
}
