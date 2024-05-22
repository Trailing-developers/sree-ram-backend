const prisma = require("../prisma/client");

const getHomeWidgets = async () => {
  const widgets = await prisma.widgets.findMany({
    where: {
      position: "HOME",
    },
  });
  return widgets;
};

/*
data: {
      position: position,
      type: type,
      data: body,
    },
*/
const addBannersWidget = async (position, type, body) => {
  const response = await prisma.widgets.upsert({
    where: {
      position_type: {
        position: position,
        type: type,
      },
    },
    create: {
      position: position,
      type: type,
      data: body,
    },
    update: {
      data: body,
    },
  });

  return response;
};

module.exports = {
  addBannersWidget,
  getHomeWidgets,
};
