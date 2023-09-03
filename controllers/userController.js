import { rules, validate } from '../middleware/signupValidator.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import randomImageName from '../utils/randomImageName.js'
import s3Bucket from '../configs/s3.js'
import sharp from 'sharp'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const { s3, PutObjectCommand, buckeName, GetObjectCommand } = s3Bucket

const controller = {
  getMe: (req, res) => {
    const user = {
      username: req.user.username,
      email: req.user.email,
      id: req.user._id,
    }
    res.status(200).json({
      user,
    })
  },

  createUser: [
    ...rules,
    validate,
    asyncHandler(async (req, res) => {
      const { username, email, firstname, lastname, DOB, password } = req.body
      const userExists = await User.findOne({ email, username })
      if (userExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists.' }] })
      }
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const user = await User.create({
        username,
        email,
        firstname,
        lastname,
        DOB,
        password: hashedPassword,
      })
      if (user) {
        return res.status(201).json({
          username: user.username,
          token: generateToken(user._id),
        })
      }
    }),
  ],

  login: asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (user && (await bcrypt.compare(password, user.password))) {

      const avatarUrl = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: buckeName,
          Key: user.avatar,
        }),
        { expiresIn: 7200 }
      )

      return res.status(200).json({
        username: user.username,
        avatar: avatarUrl,
        token: generateToken(user._id),
      })
    }
    return res.status(401).json({ errors: [{ msg: 'Invalid credentials.' }] })
  }),

  uploadAvatar: asyncHandler(async (req, res) => {
    

    const buffer = await sharp(req.file.buffer).resize(180, 180).toBuffer()
    const imageName = randomImageName()

    const command = new PutObjectCommand({
      Bucket: buckeName,
      Key: imageName,
      Body: buffer,
      ContentType: req.file.mimetype,
    })
    const commandResponse = await s3.send(command)

    if (commandResponse.$metadata.httpStatusCode === 200) {

      
      await User.findOneAndUpdate(
        { _id: req.user.id },
        { avatar: imageName },
        { new: true }
      )

      const avatarUrl = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: buckeName,
          Key: imageName,
        }),
        { expiresIn: 3600 }
      )

      return res.status(200).json({
        avatarUrl,
      })
    } else {
      return res.status(500).json({ errors: [{ msg: 'Upload failed.' }] })
    }
  }),

  delete: (req, res) => {
    res.send('User deleted.')
  },
}

export default controller
