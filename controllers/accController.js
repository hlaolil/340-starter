const utilities = require("../utilities/")


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("accounts/login", {
    title: "Login",
    nav,
    message: req.flash("notice") [0] || null
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
    message: req.flash("notice") [0] || null
  });
}

module.exports = { buildLogin, buildRegister }
