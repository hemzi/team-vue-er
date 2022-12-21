require("./config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const deviceRoutes = require("./Routes/DevicesRouter");

const HOST = process.env.HOST;
const PORT = process.env.PORT;

// server
const app = express();

// middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

// routes
app.use("/api/v1/devices", deviceRoutes);

// init server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else console.log(`Server listening on:: ${HOST}:${PORT}`);
});
