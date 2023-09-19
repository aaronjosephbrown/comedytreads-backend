import User from '../../models/userModel.js'

const getUserByUsername = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    res.status(200).json({
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Server Error',
    })
  }
}

export default getUserByUsername
