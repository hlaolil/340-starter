const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory item detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventoryId = req.params.inventoryId;
  const vehicle = await invModel.getVehicleById(inventoryId);
  let nav = await utilities.getNav();
  
  if (!vehicle) {
    const errorMessage = "The requested vehicle could not be found.";
    return res.status(404).render("errors/error", {
      title: "Vehicle Not Found",
      nav,
      message: errorMessage,
    });
  }
  
  const detail = await utilities.formatVehicleDetailHTML(vehicle);
  res.render("inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    detail,
  });
};

  module.exports = invCont
