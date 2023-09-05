import { rules, validate } from '../../middleware/signupValidator.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../../models/userModel.js'
import generateToken from '../../utils/generateToken.js'

const createUser = [
  ...rules,
  validate,
  asyncHandler(async (req, res) => {
    const { username, email, firstname, lastname, DOB, password } = req.body
    const userExists = await User.findOne({ email, username })
    if (userExists) {
      return res.status(400).json({ errors: [{ msg: 'User already exists.' }] })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
      username,
      email,
      firstname,
      lastname,
      avatar: '',
      DOB,
      threads: [],
      fans: 0,
      following: 0,
      audience: [],
      fanOf: [],
      password: hashedPassword,
    })
    if (user) {
      return res.status(201).json({
        username: user.username,
        token: generateToken(user._id),
      })
    }
  }),
]

export default createUser
