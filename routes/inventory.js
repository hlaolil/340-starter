// routes/inventory.js
const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")

// Detail route: /inventory/detail/1
router.get("/detail/:inv_id", invController.buildByInventoryId)

module.exports = router