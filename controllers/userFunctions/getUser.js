const getUser = (req, res) => {
  const user = {
    username: req.user.username,
    email: req.user.email,
    id: req.user._id,
    avatar: req.user.avatar,
    threads: req.user.threads,
    fans: req.user.fans,
    following: req.user.following,
    audience: req.user.audience,
    fanOf: req.user.fanOf,
  }
  res.status(200).json({
    user,
  })
}

export default getUser
