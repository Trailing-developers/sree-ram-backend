const {
  addEvent,
  getEventById,
  getAllEventsBetweenDates,
} = require("../repository/event");

const createEvent = (req, res) => {
  const items = req.body;
  console.log(JSON.stringify(items));
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

const getEventsBwDays = (req, res) => {
  const { start, end } = req.params;
  getAllEventsBetweenDates(start, end).then((event) => {
    res.json({
      status: "success",
      data: event,
    });
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
