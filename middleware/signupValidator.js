import { check, validationResult } from 'express-validator'
import moment from 'moment'

export const rules = [
  check('username')
    .isLength({ min: 5 })
    .withMessage('Username must be at least 5 characters.'),
  check('email').isEmail().withMessage('Email is invalid.').normalizeEmail(),
  check('firstname')
    .isLength({ min: 2 })
    .withMessage('Firstname must be at least 2 characters.'),
  check('lastname')
    .isLength({ min: 2 })
    .withMessage('Lastname must be at least 2 characters.'),
  check('DOB')
    .custom((value) => {
      if (moment(value, 'MM-DD-YYYY', true).isValid()) {
        return true
      }
    })
    .withMessage('Invalid format.'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter.')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter.')
    .matches(/[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]/)
    .withMessage(
      'Password must contain at least one number and one special character.'
    ),
  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match.')
    }
    return true
  }),
]

export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}
