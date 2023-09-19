import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    thread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread',
    },

    text: {
      type: String,
      required: [true, 'Please enter your comment'],
    },

    likesCount: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
)

export default mongoose.model('Comment', commentSchema)
