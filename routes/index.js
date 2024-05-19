const express = require("express");
const router = express.Router();

const {
  updateSuccess,
  createOption,
  createPage,
} = require("../controllers/admin");

router.get("/", createOption);
router.get("/create/:type", createPage);
router.post("/submit", updateSuccess);

module.exports = router;
