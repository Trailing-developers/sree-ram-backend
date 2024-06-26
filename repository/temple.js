const prisma = require("../prisma/client");

const getTempleById = async (id) => {
  const temple = await prisma.temple.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      address: {
        select: {
          address1: true,
          address2: true,
          district: true,
          city: true,
          state: true,
          country: true,
          latitude: true,
          longitude: true,
        },
      },
      gods: {
        include: {
          god: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return temple;
};

const getTempleSuggestions = async (query) => {
  const allTemples = await prisma.temple.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10,
  });
  return allTemples;
};

const addMedia = async (body) => {
  const createMedias = await prisma.media.createMany({
    data: body,
    skipDuplicates: true,
  });
  return createMedias;
};

const findTempleMedia = async (id) => {
  const createMedias = await prisma.media.findMany({
    where: {
      templeId: parseInt(id),
      entityType: "temple",
    },
  });
  return createMedias;
};

const addTemple = async (body) => {
  const temple = await prisma.temple.create({
    data: {
      name: body.name,
      description: body.description,
      image: body.image,
      addressId: parseInt(body.address),
      latitude: body.place.lat,
      longitude: body.place.lon,
      crowded: body.crowds,
      busyDays: {
        monday: body.busyDay.monday == "on",
        tuesday: body.busyDay.tuesday == "on",
        wednesday: body.busyDay.wednesday == "on",
        thursday: body.busyDay.thursday == "on",
        friday: body.busyDay.friday == "on",
        saturday: body.busyDay.saturday == "on",
        sunday: body.busyDay.sunday == "on",
      },
      darshanTimings: body.darshan.timings[0],
      darshanTypes: body.darshanTypes,
      history: body.history,
      gods: {
        create: body.godIds.map((godId) => ({
          god: { connect: { id: parseInt(godId) } },
        })),
      },
      information: body.information,
    },
  });
  return temple;
};

module.exports = {
  getTempleById,
  getTempleSuggestions,
  addTemple,
  addMedia,
  findTempleMedia,
};
