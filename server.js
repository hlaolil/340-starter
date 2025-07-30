const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")
const env = require("dotenv").config()
const app = express()
const utilities = require('./utilities')

// Serve static files
app.use(express.static(path.join(__dirname, "public")))

/* View Engine and Templates */
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* Routes */
app.get("/", function(req, res) {
  res.render("index", { title: "Home" });
})

/* 404 Not Found */
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' })
})

/* Error Handler */
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})

/* Start Server */
const port = process.env.PORT
const host = process.env.HOST
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`)
})
