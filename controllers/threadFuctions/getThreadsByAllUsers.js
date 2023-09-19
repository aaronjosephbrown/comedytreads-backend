import Thread from '../../models/threadModel.js'
import User from '../../models/userModel.js'
import s3Bucket from '../../configs/s3.js'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const getThreadsByAllUsers = ( _, res) => {
  const { s3, buckeName, GetObjectCommand } = s3Bucket
  Thread.find({}).then((threads) => {
    const promises = threads.map(async (thread) => {
      const user = await User.findOne({ _id: thread.user })
      let avatarUrl = ''
      if (user.avatar !== '') {
        avatarUrl = await getSignedUrl(
          s3,
          new GetObjectCommand({
            Bucket: buckeName,
            Key: user.avatar,
          }),
          { expiresIn: 7200 }
        )
      }
      return {
        _id: thread._id,
        text: thread.text,
        username: user.username,
        avatar: avatarUrl,
        createdAt: thread.createdAt,
        likedBy: thread.likedBy,
        likesCount: thread.likesCount,
      }
    })
    Promise.all(promises).then((results) => {
      res.status(200).json(results)
    })
  })
}

export default getThreadsByAllUsers
