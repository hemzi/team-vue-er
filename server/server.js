require("./config");
const express = require("express");
const morgan = require("morgan");
const deviceRoutes = require("./Routes/DevicesRouter");

const router = express.Router();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

// server
const app = express();

// middleware
app.use(morgan("tiny"));
app.use(express.json());

// routes
app.use("/devices", deviceRoutes);

// init server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else console.log(`Server listening on:: ${HOST}:${PORT}`);
});
