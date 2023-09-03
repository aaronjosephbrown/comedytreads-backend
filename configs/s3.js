import dotenv from 'dotenv'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'

dotenv.config()

const buckeName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
})


const s3Bucket =  {
  PutObjectCommand,
  GetObjectCommand,
  s3,
  buckeName,
}

export default s3Bucket