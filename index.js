import express from 'express'
import dotenv from 'dotenv'
import colors from './utils/colors.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import threadsRouter from './routes/Threads.js'
import commentsRouter from './routes/Comments.js'
import usersRouter from './routes/Users.js'

dotenv.config()

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(bodyParser.json())


app
  .use('/threads', threadsRouter)
  .use('/comments', commentsRouter)
  .use('/users', usersRouter)

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`.info.bold)
})
