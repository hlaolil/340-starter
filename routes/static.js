const express = require('express');
const router = express.Router();
const baseController = require("../controllers/baseController");

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));
router.use("/js", express.static(__dirname + "public/js"));
router.use("/images", express.static(__dirname + "public/images"));

// Intentional error route
router.get("/trigger-error", baseController.triggerIntentionalError);

module.exports = router;

