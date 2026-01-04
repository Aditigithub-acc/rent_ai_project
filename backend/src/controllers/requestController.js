const Request = require("../models/Request")
const Property = require("../models/Property")

// @route   POST /api/request
// @desc    Create a tenant request
exports.createRequest = async (req, res) => {
  try {
    const { propertyId, message } = req.body

    const property = await Property.findById(propertyId)
    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    const request = await Request.create({
      tenant: req.user.id,
      property: propertyId,
      owner: property.owner,
      message,
      status: "pending",
    })

    res.status(201).json({ success: true, request })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   GET /api/request/owner/requests
// @desc    Get requests for owner's properties
exports.getOwnerRequests = async (req, res) => {
  try {
    const requests = await Request.find({ owner: req.user.id })
      .populate("tenant", "firstName lastName email phone")
      .populate("property", "address price")
      .sort({ createdAt: -1 })

    res.status(200).json({ success: true, count: requests.length, requests })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @route   PUT /api/request/:id
// @desc    Accept or reject a request
exports.respondToRequest = async (req, res) => {
  try {
    const { status } = req.body

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    const request = await Request.findByIdAndUpdate(req.params.id, { status, respondedAt: new Date() }, { new: true })

    // If accepted, update property tenant
    if (status === "accepted") {
      await Property.findByIdAndUpdate(request.property, {
        currentTenant: request.tenant,
        status: "hired",
      })
    }

    res.status(200).json({ success: true, request })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
