const utilities = require("../utilities/")
const accountModel = require("../models/accountModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()


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

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("accounts/login", {
      title: "Login",
      nav,
      message: req.flash("notice")[0] || "",
      errors: null,
      account_email,
    })
    return
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      if(process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      } else {
        res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
      }
      return res.redirect("/accounts/")
    }
    else {
      req.flash("notice", "Please check your credentials and try again.")
      res.status(400).render("accounts/login", {
        title: "Login",
        nav,
        message: req.flash("notice")[0] || "",
        errors: null,
        account_email,
      })
    }
  } catch (error) {
    throw new Error('Access Forbidden')
  }
}

/* ***************************
 *  Build Account Management view
 * ************************** */
async function accountManagement(req, res, next) {
  let nav = await utilities.getNav()
  const accountData = res.locals.accountData // comes from JWT middleware
  
  res.render("accounts/management", {
    title: "Account Management",
    nav,
    message: req.flash("notice")[0] || "",
    errors: null,
    account_firstname: accountData.account_firstname,
    account_type: accountData.account_type,
    account_id: accountData.account_id
  })
}

/* ***************************
 *  Build Update Account view
 * ************************** */
async function buildUpdateAccount(req, res, next) {
  let nav = await utilities.getNav()
  const account_id = req.params.account_id
  const accountData = await accountModel.getAccountById(account_id)

  res.render("accounts/update-account", {
    title: "Update Account",
    nav,
    message: req.flash("notice")[0] || "",
    errors: null,
    account_firstname: accountData.account_firstname,
    account_lastname: accountData.account_lastname,
    account_email: accountData.account_email,
    account_id: accountData.account_id
  })
}

/* ***************************
 * Process account info update
 * ************************** */
async function updateAccount(req, res, next) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_id } = req.body

  const updateResult = await accountModel.updateAccountInfo(
    account_id,
    account_firstname,
    account_lastname,
    account_email
  )

  if (updateResult) {
    req.flash("notice", "Account information updated successfully.")
    const updatedAccount = await accountModel.getAccountById(account_id)
    res.locals.accountData = updatedAccount
    res.redirect("/accounts/")
  } else {
    req.flash("notice", "Error updating account information.")
    res.redirect("/accounts/update/" + account_id)
  }
}

/* ***************************
 * Process password change
 * ************************** */
async function updatePassword(req, res, next) {
  let nav = await utilities.getNav()
  const { account_id, account_password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(account_password, 10)
    const updateResult = await accountModel.updateAccountPassword(account_id, hashedPassword)

    if (updateResult) {
      req.flash("notice", "Password updated successfully.")
      res.redirect("/accounts/")
    } else {
      req.flash("notice", "Error updating password.")
      res.redirect("/accounts/updatePassword/" + account_id)
    }
  } catch (error) {
    req.flash("notice", "Error processing password change.")
    res.redirect("/accounts/updatePassword/" + account_id)
  }
}

/* View accounts with optional last name filter */
async function buildAccountsView(req, res, next) {
  try {
    let nav = await utilities.getNav();
    let selectedLastName = req.query.account_lastname || "";
    let accounts;

    if (selectedLastName) {
      accounts = await accountModel.filterAccountsByLastName(selectedLastName);
    } else {
      accounts = await accountModel.getAllAccounts();
    }

    // Get all distinct last names for filter dropdown
    const lastNames = await accountModel.getAllLastNames();

    res.render("accounts/accountsView", {
      title: "View Accounts",
      nav,
      accounts,
      lastNames,
      selectedLastName,
      count: accounts.length,
      errors: null
    });
  } catch (err) {
    console.error("Error retrieving accounts:", err);
    req.flash("error", "Unable to retrieve accounts.");
    res.redirect("/accounts/accountsView");
  }
}

module.exports = {
  buildAccountsView,
  updateAccount,
  updatePassword,
 buildLogin, 
 buildRegister, 
 registerAccount, 
 accountLogin, 
 accountManagement, 
 buildUpdateAccount}
