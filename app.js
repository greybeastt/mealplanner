require("dotenv").config();
const config = require("config");

const mongoose = require("mongoose");

const server = require("./app.server");
const logger = require("./src/utils/logger");

const port = process.env.PORT || 3000;

const power_outage = false;
power_outage
  ? server.listen(port, async () => {
      logger.info(">> server started on port:" + port);
    })
  : mongoose
      .connect(config.get("MONGO_URI"), {
        dbName: "eatthismuch",
      })
      .then((result) => {
        server.listen(port, async () => {
          logger.info(">> server started on port:" + port);
        });
      });
