import createThread from './threadFuctions/createThread.js'
import getThreadsByUser from './threadFuctions/getThreadsByUser.js'
import getThreadsByAllUsers from './threadFuctions/getThreadsByAllUsers.js'
import deleteThread from './threadFuctions/deleteThread.js'
import likeThread from './threadFuctions/likeThread.js'
import unlikeThread from './threadFuctions/unlikeThread.js'

const controller = {
  createThread,
  getThreadsByUser,
  getThreadsByAllUsers,
  updateThread: (req, res) => {
    res.send('putting new comedy gold...')
  },
  deleteThread,
  likeThread,
  unlikeThread,
}

export default controller
