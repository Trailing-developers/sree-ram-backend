const express = require("express");
const { createTemple, getTemple } = require("../controllers/temple");
const router = express.Router();

router.post("/temple", createTemple).get("/temple/:templeId", getTemple);

module.exports = router;
