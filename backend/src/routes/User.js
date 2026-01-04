const express = require("express")
const { protect } = require("../middleware/auth")
const {
  getProfile,
  updateProfile,
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../controllers/userController")

const router = express.Router()

router.get("/profile", protect, getProfile)
router.put("/profile", protect, updateProfile)
router.post("/favorites/:propertyId", protect, addFavorite)
router.delete("/favorites/:propertyId", protect, removeFavorite)
router.get("/favorites", protect, getFavorites)

module.exports = router
