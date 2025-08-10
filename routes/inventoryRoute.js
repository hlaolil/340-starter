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

// View by classification
router.get("/type/:classification_id", invController.buildByClassificationId)

// View specific inventory item
router.get("/detail/:inventory_id", invController.buildByInventoryId)

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

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

//Edit inventory view
router.get('/edit/:inv_id', utilities.handleErrors(invController.editInventoryView))

router.get('/delete/:inv_id', utilities.handleErrors(invController.deleteView))

router.post("/update/", inventoryRules(), checkUpdateData, utilities.handleErrors(invController.updateInventory))

module.exports = router

