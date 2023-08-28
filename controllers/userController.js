import { rules, validate } from '../middleware/signupValidator.js'

const controller = {
  getUser: (req, res) => {
    res.json({
      users: ['aaron', 'brian', 'cathy'],
    })
  },
  createUser: [
    ...rules,
    validate,
    (req, res) => {
      const {
        username,
        email,
        firstname,
        lastname,
        DOB,
        password,
        confirmPassword,
      } = req.body
      res.status(201).json({
        username,
        email,
        firstname,
        lastname,
        DOB,
        password,
        confirmPassword,
      })
    },
  ],
  put: (req, res) => {
    res.send('User updated.')
  },
  delete: (req, res) => {
    res.send('User deleted.')
  },
}

export default controller
