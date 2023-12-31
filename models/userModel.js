import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please enter your name'],
    },

    lastname: {
      type: String,
      required: [true, 'Please enter your name'],
    },

    username: {
      type: String,
      required: [true, 'Please enter your username'],
      unique: true,
    },

    DOB: {
      type: Date,
      required: [true, 'Please enter your date of birth'],
    },

    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
    },

    password: {
      type: String,
      required: [true, 'Please enter your password'],
    },

    avatar: {
      type: String,
      default: '',
    },

    threads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread',
      },
    ],

    fans: {
      type: Number,
      default: 0,
    },

    following: {
      type: Number,
      default: 0,
    },
    audience: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    fanOf: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },

  {
    timestamps: true,
  }
)

export default mongoose.model('User', userSchema)
