const path = require("path");
console.log(path.join(__dirname, `/env/${process.env.NODE_ENV}.env`));
const dotenv = require("dotenv").config({
  path: path.join(__dirname, `/env/${process.env.NODE_ENV}.env`),
});
module.exports = dotenv;
