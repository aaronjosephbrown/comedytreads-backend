import asyncHandler from 'express-async-handler'
import sharp from 'sharp'
import randomImageName from '../../utils/randomImageName.js'
import s3Bucket from '../../configs/s3.js'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const updateAvatar = asyncHandler(async (req, res) => {
  const { s3, PutObjectCommand, buckeName, GetObjectCommand } = s3Bucket
  const buffer = await sharp(req.file.buffer).resize(180, 180).toBuffer()
  const imageName = randomImageName()

  const command = new PutObjectCommand({
    Bucket: buckeName,
    Key: imageName,
    Body: buffer,
    ContentType: req.file.mimetype,
  })

  const commandResponse = await s3.send(command)

  if (commandResponse.$metadata.httpStatusCode === 200) {
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { avatar: imageName },
      { new: true }
    )

    const avatarUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: buckeName,
        Key: imageName,
      }),
      { expiresIn: 3600 }
    )

    return res.status(200).json({
      avatar: avatarUrl,
    })
  } else {
    return res.status(500).json({ errors: [{ msg: 'Upload failed.' }] })
  }
})

export default updateAvatar
