const tv = require("../Models/teamviewer");

tv.api_key = process.env.TOKEN_TV;

// auto refresh of "cache"
setInterval(() => {
  console.log("refresh");
  tv.getDevices();
}, 1000 * 60 * 3);

// sends local cash instead of calling TV api
exports.get_devices = (req, res) => {
  res.send(tv.devices);
};

exports.update_device = async (req, res) => {
  const device_id = req.params.device_id;
  const alias = req.body.alias;
  const success = await tv.updateDevice({ alias, device_id });
  if (success) {
    console.log(success);
    res.status(204).send({});
  }
};

// refreshes local cache
exports.refresh_devices = (req, res) => {
  tv.getDevices();
};
