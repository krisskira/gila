import { type Request, type Response } from "express"
import MessageRepository from "../data/message.repository"
import UserRepository from "../data/user.repository"
import { NotificationService } from "../services/notification.service"
import MessagesLogRepository from "../data/messagesLog.repository"

export const messagePublishController = async (
  req: Request,
  resp: Response
): Promise<void> => {
  const { categoryCode = "", content = "" } = req.body

  if (!categoryCode || !content) {
    resp.status(400).json({
      message: "The categoryCode and content are required",
    })
    return
  }

  const usersRepository = new UserRepository()
  const users = await usersRepository.getAllBySubscritionCode(categoryCode)
  const messageRepository = new MessageRepository()
  let messageId = ""

  try {
    const promisesSync: Array<Promise<void>> = []
    messageId = await messageRepository.save({ categoryCode, content })
    for (const user of users) {
      promisesSync.push(usersRepository.addMessage(user.id, messageId))
    }
    await Promise.all(promisesSync)
  } catch (error) {
    console.error(">>>Ups! \n\n", error, "\n")
    resp.status(400).json({ message: "The messages can't be delivery" })
    return
  }

  if (!users.length) {
    resp.status(200).json({ total: 0 })
    return
  }

  const total = await NotificationService.notify(users, content, categoryCode)
  resp.status(201).json({ total })
}

export const messagesListController = async (
  _req: Request,
  resp: Response
): Promise<void> => {
  const messageRepo = new MessageRepository()
  const messages = await messageRepo.getAll()
  resp.json(messages)
}

export const messagesLogController = async (
  _req: Request,
  resp: Response
): Promise<void> => {
  const messageRepo = new MessagesLogRepository()
  const messages = await messageRepo.getAll()
  resp.json(messages)
}
