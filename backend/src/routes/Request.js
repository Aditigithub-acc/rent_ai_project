const express = require("express")
const { protect } = require("../middleware/auth")
const { authorize } = require("../middleware/roleCheck")
const { createRequest, getOwnerRequests, respondToRequest } = require("../controllers/requestController")

const router = express.Router()

router.post("/", protect, authorize("tenant"), createRequest)
router.get("/owner/requests", protect, authorize("owner"), getOwnerRequests)
router.put("/:id", protect, authorize("owner"), respondToRequest)

module.exports = router
