const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const cors = require("cors");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

// const Recipe = require("./src/model/receipe.model");
const logger = require("./src/utils/logger");
const adminRoute = require("./src/admin/admin.routes");
const userRoute = require("./src/user/user.routes");

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
app.use("/api/v1", userRoute);

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.statusCode || res.statusCode || 500);
  res.send({ error: err.message });
});

module.exports = app;
