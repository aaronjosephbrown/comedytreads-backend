import User from '../../models/userModel.js'
import Threads from '../../models/threadModel.js'
import s3Bucket from '../../configs/s3.js'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    const threads = await Threads.find({ user: user._id }).select('-user')
    const { s3, buckeName, GetObjectCommand } = s3Bucket
    let avatarUrl = ''
    
   
    if (user.avatar !== '') {
      avatarUrl = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: buckeName,
          Key: user.avatar,
        }),
        { expiresIn: 7200 }
      )
    }

    res.status(200).json({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      id: user._id,
      avatar: avatarUrl,
      threads: threads,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Server Error',
    })
  }
}

export default getUserByUsername
