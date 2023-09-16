import mongoose from 'mongoose'

const threadSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    text: {
      type: String,
      required: [true, 'Please enter your thread'],
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },

  {
    timestamps: true,
  }
)

export default mongoose.model('Thread', threadSchema)
