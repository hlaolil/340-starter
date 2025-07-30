// controllers/invController.js
const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

async function buildByInventoryId(req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  const data = await invModel.getInventoryById(inv_id)

  if (!data) {
    return next({ status: 404, message: "Vehicle not found" })
  }

  const vehicleName = `${data.inv_make} ${data.inv_model}`
  const vehicleHtml = utilities.buildVehicleDetailHTML(data)

  res.render("inventory/detail", {
    title: vehicleName,
    vehicleName,
    vehicleHtml
  })
}

module.exports = {
  buildByInventoryId
}