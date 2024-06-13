const { event } = require("../prisma/client");
const {
  getTithi,
  getNakshatra,
  getGoodBadTimes,
  getYogaTimings,
  getLunarMonthInfo,
  getRitu,
  getVedicDay,
} = require("../repository/calendar_event");
const {
  addEvent,
  getEventById,
  getAllEventsBetweenDates,
} = require("../repository/event");
const { getSunMoonRise } = require("../repository/sunmoonrise");

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
  const nakshatra = await getNakshatra(start);
  const tithi = await getTithi(start);
  const goodbadtimes = await getGoodBadTimes(start);
  const yogatimes = await getYogaTimings(start);
  const lunarinfo = await getLunarMonthInfo(start);
  const ritu = await getRitu(start);
  const vedic = await getVedicDay(start);

  const surmoonrise = await getSunMoonRise("india", start);

  res.json({
    status: "success",
    data: {
      events: events,
      tithi: tithi,
      nakshatra: nakshatra,
      goodbadtimes: goodbadtimes,
      yogatimes: yogatimes,
      lunarinfo: lunarinfo,
      ritu: ritu,
      vedic: vedic,
      sun_moon_rise: surmoonrise,
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
