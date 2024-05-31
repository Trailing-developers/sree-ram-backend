const prisma = require("../prisma/client");

const getAllKathas = async (type) => {
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

const getKathaById = async (id) => {
  console.log(id);
  const katha = await prisma.katha.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return katha;
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

module.exports = {
  getAllKathas,
  getKathaById,
  addKatha,
};
