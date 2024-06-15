const express = require("express");
const { authenticateToken } = require("../common/jwt");
const { auth, recipies } = require("./constrollers");

const router = express.Router();

// should send a jwt
router.post("/auth", auth);

// get all
router.get("/recipies");
router.route("/recipies").all().get(recipies).post().delete();

module.exports = router