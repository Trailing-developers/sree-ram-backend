const { getUserLocationFromIp } = require("../repository/client_location");

// Middleware to normalize and attach client IP
const clientIpMiddleware = async (req, res, next) => {
  let ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (ipAddress) {
    // Convert IPv6 loopback address to IPv4
    if (ipAddress === "::1") {
      ipAddress = "127.0.0.1";
    } else {
      // In case of multiple IP addresses in x-forwarded-for header, take the first one
      const ipAddresses = ipAddress.split(",");
      ipAddress = ipAddresses[0].trim();
      req.address = await getUserLocationFromIp(ipAddress);
    }
  }
  req.clientIp = ipAddress;
  next();
};

module.exports = {
  clientIpMiddleware,
};
