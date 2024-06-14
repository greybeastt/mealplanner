const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const logger = require("./src/common/logger");

app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/auth", (req, res) => {
  const { username, password } = req.body;
  // Handle authentication logic here
  console.log("Username:", username);
  console.log("Password:", password);

  // Respond to the client
  if (username === "test" && password === "password") {
    // Example authentication logic
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Login failed" });
  }
});

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(res.statusCode || 500);
  res.send({ error: err.message });
});

module.exports = app;
