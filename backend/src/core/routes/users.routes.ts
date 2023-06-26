import { Router } from "express"
import {
  userAddSubscriptionController,
  userCreateController,
  userListController,
  userRemoveSubscriptionController,
  userUpdateController,
} from "../../app/controllers/users.controller"

export const usersRouter = Router()

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        phoneNumber:
 *          type: string
 *        channels:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/Channel'
 *        subscribed:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/Category'
 *        messages:
 *         type: array
 *         items:
 *           allOf:
 *             - properties:
 *                 channelCode:
 *                   type: string
 *             - $ref: '#/components/schemas/Message'
 */

/**
 * @openapi
 * /api/v1.0/users:
 *   get:
 *     description: Categories of news!
 *     tags:
 *      - Users
 *     responses:
 *       200:
 *         description: Returns a list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
usersRouter.get("/users", userListController)

/*
 * @todo:
 */

usersRouter.post("/users", userCreateController)
usersRouter.put("/users", userUpdateController)
usersRouter.post("/users/subscriptions", userAddSubscriptionController)
usersRouter.delete("/users/subscriptions/:id", userRemoveSubscriptionController)

export default usersRouter
