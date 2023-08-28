import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import threadsRouter from './routes/Threads.js'
import commentsRouter from './routes/Comments.js'
import usersRouter from './routes/Users.js'
import setupSwagger from './utils/swagger.js'
import colors from './utils/colors.js'

dotenv.config()

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app
  .use('/users', usersRouter)
  .use('/threads', threadsRouter)
  .use('/comments', commentsRouter)

setupSwagger(app)

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'prod') {
  app.listen(PORT, () => {
    console.log(`Server started in ${process.env.NODE_ENV.underline.yellow} domain on ${PORT}`.info)
  })
}

export default app