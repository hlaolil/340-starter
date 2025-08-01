// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accController = require("../controllers/accController")
const utilities = require("../utilities/index");
const Util = require("../utilities/index");

// Route to build login view
router.get("/login", Util.handleErrors(accController.buildLogin));

// Route to build register view
router.get("/register", Util.handleErrors(accController.buildRegister));

//
router.post("/register", Util.handleErrors(accController.registerAccount));

module.exports = router;
