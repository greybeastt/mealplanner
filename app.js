require("dotenv").config();

const mongoose = require("mongoose");

const server = require("./app.server");
const logger = require("./src/utils/logger");

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "eatthismuch",
  })
  .then((result) => {
    server.listen(port, async () => {
      logger.info(">> server started on port:" + port);
      // console.log((await Recipe.find().limit(1)).join())
    });
  });
