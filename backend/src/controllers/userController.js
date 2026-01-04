const User = require("../models/User")

// @route   GET /api/user/profile
// @desc    Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json({ success: true, user })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   PUT /api/user/profile
// @desc    Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, bio, location, profilePhoto } = req.body

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, phone, bio, location, profilePhoto },
      { new: true, runValidators: true },
    )

    res.status(200).json({ success: true, user })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   POST /api/user/favorites/:propertyId
// @desc    Add property to favorites
exports.addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user.favoriteProperties.includes(req.params.propertyId)) {
      user.favoriteProperties.push(req.params.propertyId)
      await user.save()
    }

    res.status(200).json({ success: true, user })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   DELETE /api/user/favorites/:propertyId
// @desc    Remove property from favorites
exports.removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    user.favoriteProperties = user.favoriteProperties.filter((id) => id.toString() !== req.params.propertyId)
    await user.save()

    res.status(200).json({ success: true, user })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   GET /api/user/favorites
// @desc    Get user's favorite properties
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favoriteProperties")

    res.status(200).json({ success: true, favorites: user.favoriteProperties })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
