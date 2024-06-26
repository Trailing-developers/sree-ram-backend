const prisma = require("../prisma/client");

const getAllKathasByType = async (type) => {
  const kathaList = await prisma.katha.findMany({
    where: {
      type: type,
    },
    select: {
      title: true,
      image: true,
      type: true,
      id: true,
    },
  });
  return kathaList;
};

const getAllKathas = async () => {
  const kathaList = await prisma.katha.findMany({
    select: {
      title: true,
      image: true,
      type: true,
      id: true,
    },
  });
  return kathaList;
};

const getKathaById = async (id) => {
  console.log(id);
  const katha = await prisma.katha.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return katha;
};

const addMedia = async (body) => {
  const createMedias = await prisma.media.createMany({
    data: body,
    skipDuplicates: true,
  });
  return createMedias;
};

const getKathaSuggestions = async (query) => {
  const allKathas = await prisma.katha.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10,
  });
  return allKathas;
};

const addKatha = async (body) => {
  const katha = await prisma.katha.create({
    data: {
      title: body.title,
      content: body.content,
      image: body.image,
      type: body.type,
      gods: {
        create: body.godIds.map((godId) => ({
          god: { connect: { id: parseInt(godId) } },
        })),
      },
    },
  });
  return katha;
};

const findKathaMedia = async (id) => {
  const medias = await prisma.media.findMany({
    where: {
      kathaId: parseInt(id),
      entityType: "katha",
    },
  });
  return medias;
};

module.exports = {
  getAllKathas,
  getKathaById,
  getKathaSuggestions,
  findKathaMedia,
  addKatha,
  addMedia,
  getAllKathasByType,
};
