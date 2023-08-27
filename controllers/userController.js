const controller = {
  get: (req, res) => {
    res.json({
      users: ['aaron', 'brian', 'cathy'],
    })
  },
  post: (req, res) => {
    res.send('New user created.')
  },
  put: (req, res) => {
    res.send('User updated.')
  },
  delete: (req, res) => {
    res.send('User deleted.')
  }
}

export default controller
