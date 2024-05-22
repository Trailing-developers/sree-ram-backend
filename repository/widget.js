const prisma = require("../prisma/client");

const getHomeWidgets = async () => {
  const widgets = await prisma.widgets.findMany({
    where: {
      position: "HOME",
    },
  });
  return widgets;
};

const getHomeBanners = async () => {
  const widgets = await prisma.widgets.findFirst({
    where: {
      position: "HOME",
      type: "BANNER",
    },
  });
  return widgets;
};

const getHomeCalendarBanners = async () => {
  const widgets = await prisma.widgets.findFirst({
    where: {
      position: "HOME",
      type: "CALENDAR_BANNER",
    },
  });
  return widgets;
};

const getDarshanBanners = async () => {
  const widgets = await prisma.widgets.findFirst({
    where: {
      position: "DARSHAN",
      type: "BANNER",
    },
  });
  return widgets;
};

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
  getHomeBanners,
  getHomeCalendarBanners,
  getDarshanBanners,
};
