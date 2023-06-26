import { Router } from "express"
import {
  messagePublishController,
  messagesListController,
  messagesLogController,
} from "../../app/controllers/messages.controller"

export const notificationsRouter = Router()

/**
 * @openapi
 * components:
 *  schemas:
 *    Message:
 *      type: object
 *      properties:
 *        content:
 *          type: string
 *        createdAt:
 *          type: string
 *        category:
 *          $ref: '#/components/schemas/Category'
 *    MessageLog:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        channel:
 *          type: string
 *        category:
 *          type: string
 *        message:
 *          type: string
 *        user:
 *          type: string
 *        createdAt:
 *          type: string
 *    MessageBody:
 *      type: object
 *      properties:
 *        categoryCode:
 *          type: string
 *        content:
 *          type: string
 */

/**
 * @openapi
 * /api/v1.0/messages:
 *   get:
 *     description: Categories of news!
 *     tags:
 *      - Messages
 *     responses:
 *       200:
 *         description: Returns a list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */
notificationsRouter.get("/messages", messagesListController)

/**
 * @openapi
 * /api/v1.0/messages:
 *   post:
 *     tags:
 *      - Messages
 *     description: Posting a new message to users who are subscribed to the category, is delivered by all user channels.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageBody'
 *           example:
 *             categoryCode: NEWS
 *             content: ⚡️ This guy is incredible and we must contracted the as soon as possible 🔥.
 *     responses:
 *       200:
 *         description: Returns the total notifications sended.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totals:
 *                   type: number
 */
notificationsRouter.post("/messages", messagePublishController)

/**
 * @openapi
 * /api/v1.0/messages/logs:
 *   get:
 *     description: Logs the all messages posted!
 *     tags:
 *      - Messages
 *     responses:
 *       200:
 *         description: Returns a list of messages log.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MessageLog'
 */
notificationsRouter.get("/messages/logs", messagesLogController)

export default notificationsRouter
