import { type Request, type Response } from "express"
import ChannelRepository from "../data/channel.repository"

export const channelListController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const channelRepository = new ChannelRepository()
  const channels = await channelRepository.getAll()
  res.json(channels)
}

export const channelCreateController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { code = "", name = "" } = req.body
  if (!code || !name) {
    res.status(400).json({ message: "The code and name must be provided" })
    return
  }
  try {
    const channelRepo = new ChannelRepository()
    const channels = await channelRepo.createNew({ code, name })
    res.json({ id: channels })
  } catch (error) {
    console.log("\n>>> 😱 Ups!\n", error, "\n\n")
    res.status(500).send({
      message: "The code must be unique and both fields are required",
    })
  }
}
