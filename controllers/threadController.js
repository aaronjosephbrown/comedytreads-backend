const controller = {
  get: (req, res) => {
    res.send('getting new comedy gold...')
  },
  post: (req, res) => {
    res.send('posting new comedy gold...')
  },
  put: (req, res) => {
    res.send('putting new comedy gold...')
  },
  delete: (req, res) => {
    res.send('deleting new comedy gold...')
  },
}

export default controller
