import asyncHandler from 'express-async-handler'
import decodeToken from '../utils/decodeToken.js'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let user
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      user = decodeToken(token)
      req.user = await User.findById(user.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }
  if (!user) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export { protect }