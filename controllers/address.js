const {
  addAddress,
  getAddressById,
  searchAddress,
} = require("../repository/address");
const { getAddressFromPincode } = require("../repository/pincode");

const createAddress = (req, res) => {
  const items = req.body;
  console.log(JSON.stringify(items));
  addAddress(items)
    .then((address) => {
      res.json({
        status: "success",
        message: address,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "error",
        message: err,
      });
    });
};

const addressById = (req, res) => {
  const { addressId } = req.params;
  getAddressById(addressId).then((address) => {
    res.json({
      status: "success",
      data: address,
    });
  });
};

const addressSuggestion = (req, res) => {
  const query = req.query.q;
  searchAddress(query)
    .then((address) => {
      res.json({
        status: "success",
        data: address,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "error",
        message: err,
      });
    });
};

const addressSuggestionFromPincode = async (req, res) => {
  const { country, pincode } = req.params;
  if (country.toLowerCase() !== "india") {
    res.json({ data: [] });
  }
  getAddressFromPincode(pincode)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = {
  createAddress,
  addressById,
  addressSuggestion,
  addressSuggestionFromPincode,
};
