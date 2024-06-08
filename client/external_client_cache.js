const prisma = require("../prisma/client");

const getCachedItem = async (key) => {
  const cache = prisma.externalClientCache.findUnique({
    where: { key },
  });
  return cache;
};

const cacheResponse = async (key, endpoint, response) => {
  await prisma.externalClientCache.upsert({
    where: { key },
    update: { response },
    create: { key, response, endpoint },
  });
};

module.exports = {
  getCachedItem,
  cacheResponse,
};
