import express from 'express'
import controller from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router
  /**
   * @openapi
   * /users:
   *   get:
   *     description: Get user
   *     responses:
   *       200:
   *       description: Success.
   */
  .get('/me', protect, controller.getMe)
  /**
   * @openapi
   * /users:
   *   post:
   *    description: Create user with username, name, DOB, and password.
   *    parameters:
   *    - name: username
   *      description: Create a unique username.
   *      in: formData
   *      required: true
   *      type: string
   *    - name: firstname
   *      description: Enter first name.
   *      in: formData
   *      required: true
   *      type: string
   *    - name: lastname
   *      description: Enter last name.
   *      in: formData
   *      required: true
   *      type: string
   *    - name: DOB
   *      description: Enter date of birth.
   *      in: formData
   *      required: true
   *      type: string
   *      format: date
   *      example: YYYY-MM-DD
   *    - name: email
   *      description: Enter email address.
   *      in: formData
   *      required: true
   *      type: string
   *      format: email
   *    - name: password
   *      description: Enter password.
   *      in: formData
   *      required: true
   *      type: string
   *      format: password
   *    - name: confirmPassword
   *      description: Confirm password.
   *      in: formData
   *      required: true
   *      type: string
   *      format: password
   *    responses:
   *       201:
   *        description: Success.
   *       400:
   *        description: Bad request.
   *       500:
   *        description: Internal server error.
   */
  .post('/', controller.createUser)
  /**
   * @openapi
   * /users:
   *   post:
   *     description: Login user with username and password.
   *     responses:
   *       200:
   *         description: Success.
   */
  .post('/login', controller.login)
  /**
   * @swagger
   * /users:
   *   delete:
   *     description: Delete user
   *     responses:
   *       200:
   *         description: Success.
   */
  .delete('/', controller.delete)

export default router
