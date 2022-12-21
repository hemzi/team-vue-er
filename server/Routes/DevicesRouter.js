const express = require("express");
const router = express.Router();

const controller = require("../Controllers/DevicesControllers");

router.get("/", controller.get_devices);

module.exports = router;
