const { event } = require("../prisma/client");
const { getGoodBadTimes, getPanchang } = require("../repository/calendar_event");
const {
  addEvent,
  getEventById,
  getAllEventsBetweenDates,
} = require("../repository/event");

const createEvent = (req, res) => {
  const items = req.body;
  addEvent(items)
    .then((event) => {
      res.json({
        status: "success",
        message: event,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "error",
        message: err,
      });
    });
};

const getEventsBwDays = async (req, res) => {
  const { start, end } = req.params;

  const events = await getAllEventsBetweenDates(start, end);
  const panchang = await getPanchang(start);
  const goodbadtimes = await getGoodBadTimes(start);
  


  res.json({
    status: "success",
    data: {
      events: events,
      panchang: panchang,
      goodbadtimes: goodbadtimes
    },
  });
};

const getEventsById = (req, res) => {
  const { eventId } = req.params;
  getEventById(eventId).then((event) => {
    res.json({
      status: "success",
      data: event,
    });
  });
};

module.exports = {
  createEvent,
  getEventsById,
  getEventsBwDays,
};
