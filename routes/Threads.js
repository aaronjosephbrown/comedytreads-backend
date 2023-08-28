import express from 'express'
import controller from '../controllers/threadController.js'

const router = express.Router()

router
  /**
   * @swagger
   * /threads:
   *   get:
   *     description: Getting threads
   *     responses:
   *       200:
   *         description: A JSON array of threads
   */
  .get('/', controller.get)
  /**
   * @swagger
   * /threads:
   *   post:
   *     description: Post thread
   *     responses:
   *       200:
   *         description: Success.
   */
  .post('/', controller.post)
  /**
   * @swagger
   * /threads:
   *   put:
   *     description: Update thread
   *     responses:
   *       200:
   *         description: Thread updated.
   */
  .put('/', controller.put)
  /**
   * @swagger
   * /threads:
   *   delete:
   *     description: Delete thread
   *     responses:
   *       200:
   *         description: Thread deleted.
   */
  .delete('/', controller.delete)

export default router
