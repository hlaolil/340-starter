// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accController = require("../controllers/accController")
const utilities = require("../utilities/index")
const regValidate = require('../utilities/account-validation')
const validate = require('../utilities/account-validation')

// Route to build login view
router.get("/login", utilities.handleErrors(accController.buildLogin));

// Route to build register view
router.get("/register", utilities.handleErrors(accController.buildRegister));

//
router.post("/register", regValidate.registationRules(),
  regValidate.checkRegData, utilities.handleErrors(accController.registerAccount));

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accController.accountLogin)
)

// Default account route
router.get(
  "/", utilities.checkLogin,
  utilities.handleErrors(accController.accountManagement)
)

// Logout Route
router.get("/logout", (req, res) => {
  res.clearCookie("jwt")
  res.redirect("/")  // Redirect to home page after logout
})

// Update account info form
router.get("/update/:account_id", utilities.checkLogin, accController.buildUpdateAccount)

module.exports = router;
