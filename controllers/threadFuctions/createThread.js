import Thread from '../../models/threadModel.js'

const createThread = async (req, res) => {
  const user = req.user._id
  const { text } = req.body
  const thread = await Thread.create({
    user,
    text,
  })
  if (thread) {
    res.status(201).json({
      message: thread,
    })
  } else {
    res.status(400)
    throw new Error('Invalid thread data')
  }
}

export default createThread