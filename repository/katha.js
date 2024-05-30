const prisma = require("../prisma/client");

const getAllKathas = async () => {
  const kathaList = await prisma.katha.findMany();
  return kathaList;
};

const addKatha = async (body) => {
  const { title, lines, image } = body;
  const katha = await prisma.katha.create({
    data: {
      title: title,
      content: lines,
      image: image,
    },
  });
  return katha;
};

module.exports = {
  getAllKathas,
  addKatha,
};
