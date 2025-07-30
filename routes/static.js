const express = require('express')
const path = require('path')
const router = express.Router()

// Serve static files from the "public" folder
router.use(express.static(path.join(__dirname, "../public")))

// Optional: Subdirectories (not needed if above line is included correctly)
router.use("/css", express.static(path.join(__dirname, "../public/css")))
router.use("/js", express.static(path.join(__dirname, "../public/js")))
router.use("/images", express.static(path.join(__dirname, "../public/images")))

module.exports = router