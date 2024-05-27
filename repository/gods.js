const { name } = require("ejs");
const prisma = require("../prisma/client");

const getGodById = async (id) => {
  const allGods = await prisma.god.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  return allGods;
};

const getGodSuggestions = async (query) => {
  const allGods = await prisma.god.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10,
  });
  return allGods;
};

const addGod = async (body) => {
  const { name, image, description } = body;
  const god = await prisma.god.upsert({
    where: {
      name: name,
    },
    update: {
      name: name,
      description: description,
      image: image,
    },
    create: {
      name: name,
      description: description,
      image: image,
    },
  });
  return god;
};

module.exports = {
  getGodById,
  addGod,
  getGodSuggestions,
};
