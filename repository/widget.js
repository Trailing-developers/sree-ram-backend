const prisma = require("../prisma/client");

const getHomeWidgets = async () => {
  const widgets = await prisma.widgets.findMany({
    where: {
      position: "HOME",
    },
  });
  return widgets;
};

const getDarshanWidgets = async () => {
  const widgets = await prisma.widgets.findMany({
    where: {
      position: "DARSHAN",
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

const getDarshanWigets = async () => {
  const widgets = await prisma.widgets.findMany({
    where: {
      position: "DARSHAN",
      type: "WIDGETS",
    },
  });
  return widgets;
};

const addWidget = async (position, type, body) => {
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
  addWidget,
  getDarshanWigets,
  getHomeWidgets,
  getHomeBanners,
  getHomeCalendarBanners,
  getDarshanBanners,
  getDarshanWidgets,
};
