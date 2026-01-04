const express = require("express")
const { protect } = require("../middleware/auth")
const { authorize } = require("../middleware/roleCheck")
const {
  createProperty,
  getAllProperties,
  getPropertyById,
  getOwnerProperties,
  updateProperty,
  deleteProperty,
  setTenant,
} = require("../controllers/propertyController")

const router = express.Router()

// Public routes
router.get("/", getAllProperties)
router.get("/:id", getPropertyById)

// Owner routes
router.post("/", protect, authorize("owner"), createProperty)
router.get("/owner/my-properties", protect, authorize("owner"), getOwnerProperties)
router.put("/:id", protect, authorize("owner"), updateProperty)
router.delete("/:id", protect, authorize("owner"), deleteProperty)
router.put("/:id/hire-tenant", protect, authorize("owner"), setTenant)

module.exports = router
