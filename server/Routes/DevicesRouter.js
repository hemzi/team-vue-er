const express = require("express");
const router = express.Router();

const controller = require("../Controllers/DevicesControllers");

router.get("/", controller.get_devices);
router.get("/refresh", controller.refresh_devices);
router.put("/:device_id", controller.update_device);
router.delete("/:device_id", controller.remove_device);
module.exports = router;
