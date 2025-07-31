const utilities = require("../utilities/")
const baseController = {}

// Home page
baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", { title: "Home", nav })
}

// Intentional 500 Error route
baseController.triggerIntentionalError = function(req, res, next) {
  const err = new Error("This is an intentional test error.")
  err.status = 500
  next(err)
}

module.exports = baseController

