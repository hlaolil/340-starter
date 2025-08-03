const utilities = require("../utilities/")
const accountModel = require("../models/accountModel")
const bcrypt = require("bcryptjs")


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("accounts/login", {
    title: "Login",
    nav,
    message: req.flash("notice")[0] || "",
    errors: null
  });
};

/* ****************************************
*  Deliver register view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("accounts/register", {
    title: "Register",
    nav,
    message: req.flash("notice")[0] || "",
    errors: null
  });
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')

    res.status(500).render("accounts/register", {
      title: "Registration",
      nav,
      message: req.flash("notice")[0] || "",
      errors: null,
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("accounts/login", {
      title: "Login",
      nav,
      message: req.flash("notice")[0] || "",
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("accounts/register", {
      title: "Registration",
      nav,
      message: req.flash("notice")[0] || "",
      errors: null
    })
  }
}

module.exports = { buildLogin, buildRegister, registerAccount }
