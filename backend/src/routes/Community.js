const express = require("express")
const { protect } = require("../middleware/auth")
const { createPost, getAllPosts, likePost, replyToPost } = require("../controllers/communityController")

const router = express.Router()

router.post("/", protect, createPost)
router.get("/", getAllPosts)
router.post("/:id/like", protect, likePost)
router.post("/:id/reply", protect, replyToPost)

module.exports = router
