import express from 'express'
import controller from '../controllers/threadController.js'
import { protect } from '../middleware/auth.js'

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
  .get('/user', protect, controller.getThreadsByUser)
  /**
   * @swagger
   * /threads:
   *   post:
   *     description: Post thread
   *     responses:
   *       200:
   *         description: Success.
   */
  .post('/', protect, controller.createThread)
  /**
   * @swagger
   * /threads:
   *   put:
   *     description: Update thread
   *     responses:
   *       200:
   *         description: Thread updated.
   */
  .put('/', controller.updateThread)
  /**
   * @swagger
   * /threads:
   *   delete:
   *     description: Delete thread
   *     responses:
   *       200:
   *         description: Thread deleted.
   */
  .get('/all', protect, controller.getThreadsByAllUsers)
  .delete('/:threadId', protect, controller.deleteThread)

export default router
