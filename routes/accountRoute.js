// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accController = require("../controllers/accController")
const utilities = require("./utilities/index")

// Route to build specific inventory item detail view
router.get("/login/:accountId", accController.buildLogin);

module.exports = router;
