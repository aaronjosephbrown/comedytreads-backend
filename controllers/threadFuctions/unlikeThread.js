import Thread from '../../models/threadModel.js'

const unlikeThread = async (req, res) => {
  const { id } = req.params

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
      res.json(thread)
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default unlikeThread