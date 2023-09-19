import Thread from '../../models/threadModel.js'
import  getThreadsByAllUsers from './getThreadsByAllUsers.js'

const likeThread = async (req, res, next) => {
  const { id } = req.params

  try {
    const thread = await Thread.findById(id)
    if (thread.likedBy.includes(req.user._id)) {
      return res
        .status(400)
        .json({ message: 'You have already liked this thread' })
    }

    const updatedThread = await Thread.findByIdAndUpdate(
      { _id: id },
      {
        $inc: { likesCount: 1 },
        $push: { likedBy: req.user._id },
      },
      { new: true }
    )

    if (updatedThread) {
      next()
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default likeThread
