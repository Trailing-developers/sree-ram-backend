const express = require("express");
const {
  createAddress,
  addressById,
  addressSuggestion,
} = require("../controllers/address");
const router = express.Router();

router
  .get("/address/suggest", addressSuggestion)
  .get("/address/:addressId", addressById)
  .post("/address", createAddress);

module.exports = router;
