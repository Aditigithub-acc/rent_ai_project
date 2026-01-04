const Property = require("../models/Property")
const User = require("../models/User")

// @route   POST /api/property
// @desc    Create a new property
exports.createProperty = async (req, res) => {
  try {
    const { address, price, propertyType, bedrooms, bathrooms, description, images, rules, facilities } = req.body

    const owner = await User.findById(req.user.id)

    const property = await Property.create({
      owner: req.user.id,
      ownerDetails: {
        firstName: owner.firstName,
        lastName: owner.lastName,
        phone: owner.phone,
        email: owner.email,
      },
      address,
      price,
      propertyType,
      bedrooms,
      bathrooms,
      description,
      images,
      rules,
      facilities,
      status: "vacant",
    })

    res.status(201).json({ success: true, property })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   GET /api/property
// @desc    Get all properties (visible to tenants)
exports.getAllProperties = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, propertyType, bedrooms } = req.query

    const filter = {}

    if (city) filter["address.city"] = { $regex: city, $options: "i" }
    if (propertyType) filter.propertyType = propertyType
    if (bedrooms) filter.bedrooms = Number.parseInt(bedrooms)

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number.parseInt(minPrice)
      if (maxPrice) filter.price.$lte = Number.parseInt(maxPrice)
    }

    const properties = await Property.find(filter)
      .populate("owner", "firstName lastName phone email profilePhoto")
      .lean()

    res.status(200).json({ success: true, count: properties.length, properties })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   GET /api/property/:id
// @desc    Get single property
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("owner", "firstName lastName phone email profilePhoto bio")
      .populate("reviews")

    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    res.status(200).json({ success: true, property })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   GET /api/property/owner/my-properties
// @desc    Get all properties of logged-in owner
exports.getOwnerProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id }).lean()

    res.status(200).json({ success: true, count: properties.length, properties })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   PUT /api/property/:id
// @desc    Update property
exports.updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id)

    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this property" })
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({ success: true, property })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   DELETE /api/property/:id
// @desc    Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)

    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this property" })
    }

    await Property.findByIdAndDelete(req.params.id)

    res.status(200).json({ success: true, message: "Property deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   PUT /api/property/:id/hire-tenant
// @desc    Set tenant for property
exports.setTenant = async (req, res) => {
  try {
    const { tenantId } = req.body
    const property = await Property.findById(req.params.id)

    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      {
        currentTenant: tenantId,
        status: "hired",
      },
      { new: true },
    )

    res.status(200).json({ success: true, property: updatedProperty })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
