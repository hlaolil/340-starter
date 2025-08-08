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
  const inventoryId = req.params.inventoryId
  const vehicle = await invModel.getVehicleById(inventoryId)
  let nav = await utilities.getNav()

  if (!vehicle) {
    const errorMessage = "The requested vehicle could not be found."
    return res.status(404).render("errors/error", {
      title: "Vehicle Not Found",
      nav,
      message: errorMessage,
    })
  }

  const detail = await utilities.formatVehicleDetailHTML(vehicle)
  res.render("inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    detail,
  })
}

/* View Management */
invCont.buildManagement = async function (req, res) {
  let nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
    message: req.flash("message"),
    classificationList,
  })
}

/* View Add Classification */
invCont.buildAddClassification = async function (req, res) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
    message: req.flash("message"),
  })
}

/* Process Add Classification */
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body
  const result = await invModel.addClassification(classification_name)
  let nav = await utilities.getNav()
  if (result) {
    req.flash("message", "Classification added successfully.")
    res.redirect("/inv")
  } else {
    req.flash("message", "Failed to add classification.")
    res.status(500).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
      message: req.flash("message"),
    })
  }
}

/* View Add Inventory */
invCont.buildAddInventory = async function (req, res) {
  let nav = await utilities.getNav();
  let classificationList = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationList,
    errors: null,
    message: req.flash("message"),
    inv_make: "", // Default empty string
    inv_model: "", // Default empty string
    inv_year: "", // Default empty string
    inv_description: "", // Default empty string
    inv_image: "", // Default empty string
    inv_thumbnail: "", // Default empty string
    inv_price: "", // Default empty string
    inv_miles: "", // Default empty string
    inv_color: "", // Default empty string
    classification_id: "", // Default empty string
    ...req.body, // Still spread req.body to preserve form data on POST
  });
};

/* Process Add Inventory */
invCont.addInventory = async function (req, res) {
  const inventoryData = req.body
  const insertResult = await invModel.addInventory(inventoryData)

  let nav = await utilities.getNav()
  if (insertResult) {
    req.flash("message", "Inventory item added successfully.")
    res.redirect("/inv")
  } else {
    let classificationList = await utilities.buildClassificationList(inventoryData.classification_id)
    req.flash("message", "Failed to add inventory.")
    res.status(500).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors: null,
      message: req.flash("message"),
      ...inventoryData,
    })
  }
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.editInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryByClassificationId(inv_id)
  const classificationList = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationList: classificationList,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

module.exports = invCont


