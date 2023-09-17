import Threads from '../../models/threadModel.js'

const getUserLikes = async (req, res) => {
  try {
    const { id } = req.params
    const threads = await Threads.find({ likes: id })
    res.json(threads)
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

export default getUserLikes