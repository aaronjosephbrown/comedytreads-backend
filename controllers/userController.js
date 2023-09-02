import { rules, validate } from '../middleware/signupValidator.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

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
      return res.status(200).json({
        username: user.username,
        token: generateToken(user._id),
      })
    }
    return res.status(401).json({ errors: [{ msg: 'Invalid credentials.' }] })
  }),

  uploadAvatar: asyncHandler(async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send('Upload avatar.')
  }),

  delete: (req, res) => {
    res.send('User deleted.')
  },
}

export default controller
