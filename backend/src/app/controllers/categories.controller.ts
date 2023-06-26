import { type Request, type Response } from "express"
import SubscriptionRepository from "../data/subscription.repository"

export const categoryListController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const categoryRepo = new SubscriptionRepository()
  const categories = await categoryRepo.getAll()
  res.json(categories)
}

export const categoryCreateController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { code = "", name = "" } = req.body
  if (!code || !name) {
    res.status(400).json({ message: "The code and name must be provided" })
    return
  }
  try {
    const categoryRepo = new SubscriptionRepository()
    const categories = await categoryRepo.createNew({ code, name })
    res.json({ id: categories })
  } catch (error) {
    console.log("\n>>> 😱 Ups!\n", error, "\n\n")
    res.status(500).send({
      message: "The code must be unique and both fields are required",
    })
  }
}
