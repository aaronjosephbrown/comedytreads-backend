import Thread from '../../models/threadModel.js'

const getThreadsByUser = async (req, res) => {
  const user = req.user
  try {
    const thread = await Thread.find({ user }).select('-user')
    if (thread) {
      res.json(thread)
    } else {
      res.status(404)
      throw new Error('Thread not found')
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export default getThreadsByUser
