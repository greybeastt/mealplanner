const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

// const Recipe = require("./src/model/receipe.model");
const logger = require("./src/common/logger");
const adminRoute = require("./src/admin/routes");

app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/ping", (req, res) => res.status(200));

app.use("/admin", adminRoute);

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(res.statusCode || 500);
  res.send({ error: err.message });
});

module.exports = app;
