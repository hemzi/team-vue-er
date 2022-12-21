const tv = require("../Models/teamviewer");

tv.api_key = process.env.TOKEN_TV;

// auto refresh of "cache"
setInterval(() => {
  console.log("refresh");
  tv.getDevices();
}, 350000);

exports.get_devices = (req, res) => {
  res.send(tv.devices);
};
