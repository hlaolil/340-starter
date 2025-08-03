// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accController = require("../controllers/accController")
const utilities = require("../utilities/index");
const Util = require("../utilities/index");
const regValidate = require('../utilities/account-validation')
const validate = require('../utilities/account-validation')

// Route to build login view
router.get("/login", Util.handleErrors(accController.buildLogin));

// Route to build register view
router.get("/register", Util.handleErrors(accController.buildRegister));

//
router.post("/register", regValidate.registationRules(),
  regValidate.checkRegData, Util.handleErrors(accController.registerAccount));

// Process the login attempt
router.post(
  "/login",
  validate.loginRules(),
  validate.checkLoginData,
  (req, res) => {
    res.status(200).send("login process")
  }
)

module.exports = router;
