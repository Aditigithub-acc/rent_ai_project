const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Owner is required"],
  },
  ownerDetails: {
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  propertyType: {
    type: String,
    enum: ["flat", "house", "room"],
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  description: String,
  images: [String],
  status: {
    type: String,
    enum: ["vacant", "hired"],
    default: "vacant",
  },
  currentTenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  rules: {
    petsAllowed: Boolean,
    gendersAllowed: {
      type: [String],
      enum: ["boys", "girls", "any"],
    },
    timingRules: String,
    smokingAllowed: Boolean,
    drinkingAllowed: Boolean,
  },
  facilities: {
    parking: Boolean,
    water: Boolean,
    electricity: Boolean,
    inverter: Boolean,
    extraCharges: String,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
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

module.exports = mongoose.model("Property", propertySchema)
