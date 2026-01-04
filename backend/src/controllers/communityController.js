const Community = require("../models/Community")

// @route   POST /api/community
// @desc    Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content, location } = req.body

    const user = await require("../models/User").findById(req.user.id)

    const post = await Community.create({
      author: req.user.id,
      authorName: `${user.firstName} ${user.lastName}`,
      content,
      location,
    })

    res.status(201).json({ success: true, post })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   GET /api/community
// @desc    Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Community.find()
      .populate("author", "firstName lastName profilePhoto")
      .sort({ createdAt: -1 })
      .lean()

    res.status(200).json({ success: true, count: posts.length, posts })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   POST /api/community/:id/like
// @desc    Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Community.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    const isLiked = post.likes.includes(req.user.id)

    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user.id)
      post.likeCount = Math.max(0, post.likeCount - 1)
    } else {
      post.likes.push(req.user.id)
      post.likeCount += 1
    }

    await post.save()

    res.status(200).json({ success: true, post })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   POST /api/community/:id/reply
// @desc    Reply to a post
exports.replyToPost = async (req, res) => {
  try {
    const { content } = req.body
    const post = await Community.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    const user = await require("../models/User").findById(req.user.id)

    post.replies.push({
      author: req.user.id,
      authorName: `${user.firstName} ${user.lastName}`,
      content,
      createdAt: new Date(),
    })

    await post.save()

    res.status(201).json({ success: true, post })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
