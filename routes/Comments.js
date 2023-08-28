import express from 'express'
import controller from '../controllers/commentsController.js'

const router = express.Router()

router
  /**
   * @swagger
   * /comments:
   *   get:
   *     description: Getting comments
   *     responses:
   *       200:
   *         description: Success.
   */
  .get('/', controller.get)
  /**
   * @swagger
   * /comments:
   *   post:
   *     description: Posting comments
   *     responses:
   *       200:
   *         description: Success.
   */
  .post('/', controller.post)
  /**
   * @swagger
   * /comments:
   *   put:
   *     description: Updating comments
   *     responses:
   *       200:
   *         description: Success.
   */
  .put('/', controller.put)
  /**
   * @swagger
   * /comments:
   *   delete:
   *     description: Deleting comments
   *     responses:
   *       200:
   *         description: Success.
   */
  .delete('/', controller.delete)

export default router
