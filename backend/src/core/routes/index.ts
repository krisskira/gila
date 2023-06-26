import { Router } from "express"
import { usersRouter } from "./users.routes"
import { notificationsRouter } from "./notifications.routes"
import { categoriesRouter } from "./category.routes"
import channelRouter from "./channels.routes"

export const apiV0 = Router()
apiV0.use(usersRouter)
apiV0.use(notificationsRouter)
apiV0.use(categoriesRouter)
apiV0.use(channelRouter)

export default apiV0
