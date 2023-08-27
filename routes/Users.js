import express from 'express'
import controller from '../controllers/userController.js'

const router = express.Router()

router
  .get('/', controller.get)
  .post('/', controller.post)
  .put('/', controller.put)
  .delete('/', controller.delete)

  export default router