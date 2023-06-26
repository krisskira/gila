import { SubscriptionModel } from "../../core/database/connections"
import { type Subscrition } from "../domain/entities/subscription.entity"
import { type Repository } from "./repository"

export default class SubscriptionRepository implements Repository<Subscrition> {
  async getAll(): Promise<Subscrition[]> {
    const subscritionModels = await SubscriptionModel.findAll({
      order: [["name", "DESC"]],
    })

    const subscriptions = subscritionModels.map<Subscrition>((model) => ({
      code: model.code,
      name: model.name,
    }))

    return subscriptions
  }

  async getOne(id: number): Promise<Subscrition> {
    const model = await SubscriptionModel.findByPk(id)
    return {
      code: model?.code ?? "",
      name: model?.name ?? "",
    }
  }

  async getOneByCode(code: string): Promise<Subscrition> {
    const model = await SubscriptionModel.findOne({ where: { code } })
    return {
      code: model?.code ?? "",
      name: model?.name ?? "",
    }
  }

  async createNew(subscription: Subscrition): Promise<string> {
    const model = await SubscriptionModel.create(subscription)
    return model.id?.toString() ?? ""
  }
}
