const prisma = require("../prisma/client");

const getAddressById = async (id) => {
  const address = await prisma.address.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  return address;
};

const searchAddress = async (q) => {
  const query = q.toLowerCase();
  const address = await prisma.address.findMany({
    where: {
      OR: [
        { city: { contains: query, mode: "insensitive" } },
        { state: { contains: query, mode: "insensitive" } },
        { address1: { contains: query, mode: "insensitive" } },
        { zip: { contains: query, mode: "insensitive" } },
        { district: { contains: query, mode: "insensitive" } },
        { address2: { contains: query, mode: "insensitive" } },
        { country: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 10,
  });
  return address;
};

const addAddress = async (body) => {
  const address = await prisma.address.create({
    data: {
      description: body.description,
      address1: body.address1,
      address2: body.address2,
      district: body.district,
      city: body.city,
      state: body.state,
      pincode: body.pincode,
      country: body.country,
      latitude: body.latitude,
      longitude: body.longitude,
      isCityCenter: body.isCityCenter === "on",
      isTrainStation: body.isTrainStation === "on",
      isAirport: body.isAirport === "on",
      isBusStation: body.isBusStation === "on",
      zip: body.zip,
    },
  });
  return address;
};

module.exports = {
  getAddressById,
  searchAddress,
  addAddress,
};
