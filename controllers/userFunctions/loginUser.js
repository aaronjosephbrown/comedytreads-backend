import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../../models/userModel.js'
import generateToken from '../../utils/generateToken.js'
import s3Bucket from '../../configs/s3.js'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const loginUser = asyncHandler(async (req, res) => {
  const { s3, buckeName, GetObjectCommand } = s3Bucket
  const { username, password } = req.body
  const user = await User.findOne({ username })

  let avatarUrl = ''

  if (user && (await bcrypt.compare(password, user.password))) {
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

    return res.status(200).json({
      username: user.username,
      id: user._id,
      avatar: avatarUrl,
      token: generateToken(user._id),
    })
  }

  return res.status(401).json({ errors: [{ msg: 'Invalid credentials.' }] })
})

export default loginUser
