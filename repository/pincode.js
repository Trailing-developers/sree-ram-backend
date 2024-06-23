const FreeAstrologyClient = require("./../client/free_astrology_client");

const client = new FreeAstrologyClient(null, "https://api.postalpincode.in/");

const getAddressFromPincode = async (pincode) => {
  const response = await client.get(`pincode/${pincode}`, pincode);
  return response[0].PostOffice;
};

module.exports = {
  getAddressFromPincode,
};
