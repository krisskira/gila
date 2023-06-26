import { type Request, type Response } from "express"
import UserRepository from "../data/user.repository"

export const userListController = async (
  _req: Request,
  resp: Response
): Promise<void> => {
  const userRepo = new UserRepository()
  const user = await userRepo.getAll()
  resp.json(user)
}

export const userCreateController = async (
  _req: Request,
  resp: Response
): Promise<void> => {
  resp.status(201).json("User creation are not implemented yet")
}

export const userUpdateController = async (
  _req: Request,
  resp: Response
): Promise<void> => {
  resp.status(201).json("Update are not implemented yet")
}

export const userAddSubscriptionController = async (
  _req: Request,
  resp: Response
): Promise<void> => {
  resp.status(200).json("Add Subscriptions are not implemented yet")
}

export const userRemoveSubscriptionController = async (
  _req: Request,
  resp: Response
): Promise<void> => {
  resp.status(200).json("Remove Subscriptions are not implemented yet")
}
