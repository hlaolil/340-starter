const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const {
  classificationRules,
  checkClassificationData,
  inventoryRules,
  checkInventoryData
} = require("../utilities/inventory-validation")

// View by classification
router.get("/type/:classificationId", invController.buildByClassificationId)

// View specific inventory item
router.get("/detail/:inventoryId", invController.buildByInventoryId)

// Management view
router.get("/", utilities.handleErrors(invController.buildManagement))

// Add classification
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))
router.post(
  "/add-classification",
  classificationRules(),
  checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Add inventory
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))
router.post(
  "/add-inventory",
  inventoryRules(),
  checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

module.exports = router

