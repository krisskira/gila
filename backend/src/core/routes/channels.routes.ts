import { Router } from "express"
import { channelListController } from "../../app/controllers/channels.controller"

export const channelRouter = Router()

/**
 * @openapi
 * components:
 *  schemas:
 *    Channel:
 *      type: object
 *      properties:
 *        code:
 *          type: string
 *        name:
 *          type: string
 */

/**
 * @openapi
 * /api/v1.0/channels:
 *   get:
 *     description: Channel of notification!
 *     tags:
 *      - Channels
 *     responses:
 *       200:
 *         description: Returns a list of channels.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Channel'
 */
channelRouter.get("/channels", channelListController)

export default channelRouter
