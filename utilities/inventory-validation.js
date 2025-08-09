const { body, validationResult } = require("express-validator")
const utilities = require("../utilities")

const inventoryRules = () => {
  return [
    body("inv_make").trim().notEmpty().withMessage("Make is required."),
    body("inv_model").trim().notEmpty().withMessage("Model is required."),
    body("inv_year")
      .isInt({ min: 1886 })
      .withMessage("Valid year is required."),
    body("inv_description").trim().notEmpty().withMessage("Description is required."),
    body("inv_image").trim().notEmpty().withMessage("Image path is required."),
    body("inv_thumbnail").trim().notEmpty().withMessage("Thumbnail path is required."),
    body("inv_price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number."),
    body("inv_miles")
      .isInt({ min: 0 })
      .withMessage("Miles must be a non-negative integer."),
    body("inv_color").trim().notEmpty().withMessage("Color is required."),
    body("classification_id")
      .isInt()
      .withMessage("Choose a classification.")
  ]
}

const classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .isAlphanumeric()
      .withMessage("Classification name must not contain spaces or special characters.")
  ]
}

const checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const classificationList = await utilities.buildClassificationList(req.body.classification_id)
    return res.status(400).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav: res.locals.nav,
      classificationList,
      message: "There were errors in your submission.",
      errors: errors.array(),
      ...req.body
    })
  }
  next()
}

const checkUpdateData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const classificationList = await utilities.buildClassificationList(req.body.classification_id, inv_id)
    return res.status(400).render("inventory/edit-inventory", {
      title: "Edit",
      nav: res.locals.nav,
      classificationList,
      inv_id,
      message: "There were errors in your submission.",
      errors: errors.array(),
      ...req.body
    })
  }
  next()
}

const checkClassificationData = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).render("inventory/add-classification", {
      title: "Add Classification",
      nav: res.locals.nav,
      message: "There were errors in your submission.",
      errors: errors.array(),
      ...req.body
    })
  }
  next()
}

module.exports = {
  inventoryRules,
  checkInventoryData,
  classificationRules,
  checkClassificationData,
  checkUpdateData
} 

