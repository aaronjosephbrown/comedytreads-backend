import createThread from './threadFuctions/createThread.js'
import getThreadsByUser from './threadFuctions/getThreadsByUser.js'

const controller = {
  createThread,
  getThreadsByUser,
  updateThread: (req, res) => {
    res.send('putting new comedy gold...')
  },
  deleteThread: (req, res) => {
    res.send('deleting new comedy gold...')
  },
}

export default controller
