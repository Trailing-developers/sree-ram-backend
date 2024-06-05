const prisma = require("../prisma/client");

const getAllEventsBetweenDates = async (start, end) => {
  const events = await prisma.event.findMany({
    where: {
      AND: [
        { start: { lte: new Date(start) } },
        { end: { gte: new Date(end) } },
      ],
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
  body.start = new Date(body.end).toISOString();
  body.end = new Date(body.start).toISOString();
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
      end: body.end,
    },
  });
  return event;
};

module.exports = {
  getAllEventsBetweenDates,
  getEventById,
  addEvent,
};
