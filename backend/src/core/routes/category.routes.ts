import { Router } from "express"
import {
  categoryCreateController,
  categoryListController,
} from "../../app/controllers/categories.controller"

export const categoriesRouter = Router()

/**
 * @openapi
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      properties:
 *        code:
 *          type: string
 *        name:
 *          type: string
 */

/**
 * @openapi
 * /api/v1.0/categories:
 *   get:
 *     description: Categories of news!
 *     tags:
 *      - Categories News
 *     responses:
 *       200:
 *         description: Returns a list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
categoriesRouter.get("/categories", categoryListController)

/**
 * @openapi
 * /api/v1.0/categories:
 *   post:
 *     tags:
 *      - Categories News
 *     description: Create a new Categories News!
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *           example:
 *             code: NEWS
 *             name: Noticias
 *     responses:
 *       200:
 *         description: Returns the new category-news ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 */
categoriesRouter.post("/categories", categoryCreateController)

export default categoriesRouter
