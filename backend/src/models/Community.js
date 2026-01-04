const mongoose = require("mongoose")

const communitySchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  authorName: String,
  content: {
    type: String,
    required: [true, "Post content is required"],
  },
  location: String,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likeCount: {
    type: Number,
    default: 0,
  },
  replies: [
    {
      author: mongoose.Schema.Types.ObjectId,
      authorName: String,
      content: String,
      likes: [mongoose.Schema.Types.ObjectId],
      createdAt: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Community", communitySchema)
