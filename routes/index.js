const express = require("express");
const router = express.Router();

const { updateSuccess } = require("../controllers/admin");

router.post("/submit", updateSuccess);

module.exports = router;
