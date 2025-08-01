const utilities = require("../utilities/")


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  try {
    let nav = await utilities.getNav()
  res.render("accounts/login", {
    title: "Login",
    nav,
    message: req.flash("notice", "message") || null
  });
} catch (err) {
    next(err);
}
};

module.exports = { buildLogin }
