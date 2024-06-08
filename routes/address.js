const express = require("express");
const {
  createAddress,
  addressById,
  addressSuggestion,
  addressSuggestionFromPincode,
} = require("../controllers/address");
const router = express.Router();

router
  .get("/address/suggest", addressSuggestion)
  .get("/address/:addressId", addressById)
  .get(
    "/address/country/:country/pincode/:pincode",
    addressSuggestionFromPincode
  )
  .post("/address", createAddress);

module.exports = router;
