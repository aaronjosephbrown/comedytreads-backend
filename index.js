import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import threadsRouter from './routes/Threads.js'
import commentsRouter from './routes/Comments.js'
import usersRouter from './routes/Users.js'
import setupSwagger from './utils/swagger.js'
import colors from './utils/colors.js'
import connectDB from './configs/db.js'

dotenv.config()

const PORT = process.env.PORT || 3001

connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app
  .use('/api/users', usersRouter)
  .use('/api/threads', threadsRouter)
  .use('/api/comments', commentsRouter)
  .use('/api/me', usersRouter)

setupSwagger(app)

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'prod') {
  app.listen(PORT, () => {
    console.log(`Server started in ${process.env.NODE_ENV.underline.yellow} domain on ${PORT}`.info)
  })
}

export default app