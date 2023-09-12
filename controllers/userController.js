import getUser from './userFunctions/getUser.js'
import registerUser from './userFunctions/registerUser.js'
import loginUser from './userFunctions/loginUser.js'
import updateAvatar from './userFunctions/updateAvatar.js'
import deleteUser from './userFunctions/deleteUser.js'
import getAllUsers from './userFunctions/getAllUsers.js'

const controller = {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateAvatar,
}

export default controller
