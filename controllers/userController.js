import getUser from './userFunctions/getUser.js'
import createUser from './userFunctions/createUser.js'
import loginUser from './userFunctions/loginUser.js'
import updateAvatar from './userFunctions/updateAvatar.js'
import deleteUser from './userFunctions/deleteUser.js'
import getAllUsers from './userFunctions/getAllUsers.js'

const controller = {
  createUser,
  loginUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateAvatar,
}

export default controller
