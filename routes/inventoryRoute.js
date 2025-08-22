const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const {
  classificationRules,
  checkClassificationData,
  inventoryRules,
  checkInventoryData,
  checkUpdateData
} = require("../utilities/inventory-validation")

// Public Routes (no restriction)

// View by classification
router.get("/type/:classification_id", invController.buildByClassificationId)

// View specific inventory item
router.get("/detail/:inv_id", invController.buildByInventoryId)

// Admin-only routes: Add middleware checkAdmin

// Management view
router.get("/", utilities.checkAdmin, utilities.handleErrors(invController.buildManagement))

// Add classification
router.get("/add-classification", utilities.checkAdmin, utilities.handleErrors(invController.buildAddClassification))
router.post(
  "/add-classification",
  utilities.checkAdmin,
  classificationRules(),
  checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Add inventory
router.get("/add-inventory", utilities.checkAdmin, utilities.handleErrors(invController.buildAddInventory))
router.post(
  "/add-inventory",
  utilities.checkAdmin,
  inventoryRules(),
  checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Edit inventory view
router.get('/edit/:inv_id', utilities.checkAdmin, utilities.handleErrors(invController.editInventoryView))

// Delete inventory view
router.get('/delete/:inv_id', utilities.checkAdmin, utilities.handleErrors(invController.deleteInventoryView))

router.post("/update/", utilities.checkAdmin, inventoryRules(), checkUpdateData, utilities.handleErrors(invController.updateInventory))

router.post("/delete/", utilities.checkAdmin, utilities.handleErrors(invController.deleteInventory))

module.exports = router
