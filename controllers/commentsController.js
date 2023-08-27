const controller = {
  get: (req, res) => {
    res.send('getting comments...')
  },
  post: (req, res) => {
    res.send('posting comments...')
  },
  put: (req, res) => {
    res.send('putting comments...')
  },
  delete: (req, res) => {
    res.send('deleting comments...')
  }
}

export default controller