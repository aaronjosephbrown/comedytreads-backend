import Thread from '../../models/threadModel.js'

const unlikeThread = async (req, res, next) => {
  const { id } = req.params
  const thread = await Thread.findById(id)
  if (!thread.likedBy.includes(req.user._id)) {
    return res
      .status(400)
      .json({ message: 'You have already unliked this thread' })
  }
  try {
    const thread = await Thread.findByIdAndUpdate(
      { _id: id },
      {
        $inc: { likesCount: -1 },
        $pull: { likedBy: req.user._id },
      },
      { new: true }
    )

    if (thread) {
      next()
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default unlikeThread