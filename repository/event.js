const prisma = require("../prisma/client");

const getAllEventsBetweenDates = async (start, end) => {
  const events = await prisma.event.findMany({
    where: {
      AND: [
        { start: { gte: new Date(start) } },
        { end: { lte: new Date(end) } },
      ],
    },
    include: {
      location: {
        select: {
          address1: true,
          city: true,
          state: true,
          latitude: true,
          longitude: true,
        },
      },
    },
  });
  return events;
};

const getEventById = async (id) => {
  const events = await prisma.event.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return events;
};

const addEvent = async (body) => {
  body.start = new Date(body.start).toISOString();
  body.end = new Date(body.end).toISOString();
  const event = await prisma.event.create({
    data: {
      name: body.name,
      description: body.description,
      eventType: body.eventType,
      image: body.image,
      start: body.start,
      end: body.end,
      location: {
        connect: {
          id: parseInt(body.location),
        },
      },
    },
  });
  return event;
};

module.exports = {
  getAllEventsBetweenDates,
  getEventById,
  addEvent,
};
