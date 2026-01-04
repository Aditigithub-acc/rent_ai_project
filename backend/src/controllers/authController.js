const User = require("../models/User");
const { generateToken } = require("../services/tokenService")

// @route   POST /api/auth/signup
// @desc    Register a new user
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, role } = req.body

    // Validate input
    if (!firstName || !lastName || !email || !password || !phone || !role) {
      return res.status(400).json({ message: "Please provide all required fields" })
    }

    if (role !== "tenant" && role !== "owner") {
      return res.status(400).json({ message: "Invalid role. Must be 'tenant' or 'owner'" })
    }

    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "User already exists with this email" })
    }

    // Create new user
    user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      role,
    })

    const token = generateToken(user._id, user.role)

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   POST /api/auth/login
// @desc    Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" })
    }

    // Find user by email and select password field
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // Check password
    const isPasswordCorrect = await user.matchPassword(password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    const token = generateToken(user._id, user.role)

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   GET /api/auth/me
// @desc    Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json({ success: true, user })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   POST /api/auth/logout
// @desc    Logout user
exports.logout = (req, res) => {
  res.status(200).json({ success: true, message: "Logged out successfully" })
}
