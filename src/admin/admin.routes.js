const express = require("express");
const { authenticateToken } = require("../common/jwt");
const { auth, recipies } = require("./admin.constrollers");

const router = express.Router();

// should send a jwt
router.post("/auth", auth);

// get all
router.get("/recipies");
router.route("/recipies").all(authenticateToken).get(recipies).post().delete();

module.exports = router