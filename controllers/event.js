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

const muhuratData = {
  abhijit_data: {
    name: "Abhijit",
    desc: "any right deeds performed in good muhurta multiplies the chances of its success",
    image:
      "https://static.tnn.in/thumb/msid-106510484,thumbsize-16592,width-1280,height-720,resizemode-75/106510484.jpg",
  },
  amrit_kaal_data: {
    name: "Amrit Kaal",
    desc: "Moon is a very auspicious and beneficial planet. That is why it is marked as nectar. Amrit Choghadiya is considered good for all kinds of work.",
  },
  brahma_muhurat_data: {
    name: "Brahma Muhurta",
    desc: "Good for making day plan, meditation and reading.You will feel great and your productivity is bound to improve 5x.",
  },
  gulika_kalam_data: {
    name: "Gulika Kalam",
    desc: "Auspicious activities may be avoided",
  },
  rahu_kaalam_data: {
    name: "Rahu Kalam",
    desc: "inauspicious period of the day, not considered favourable to start any good deed",
  },
  varjyam_data: {
    name: "Varjyam",
    desc: "inauspicious period of the day",
  },
  yama_gandam_data: {
    name: "Yama Gandam",
    desc: "Avoid commencing important, money-related or travel activities, during this time",
  },
};

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
  const address = req.address;
  const timezoneOffset = req.headers["timezone-offset"] ?? 5.5;

  const events = await getAllEventsBetweenDates(start, end);
  const nakshatra = await getNakshatra(start);
  const tithi = await getTithi(start, timezoneOffset);
  const rawgoodbadtimes = await getGoodBadTimes(start);
  const goodbadtimes = transformGoodBadTimes(rawgoodbadtimes);
  const yogatimes = await getYogaTimings(start);
  const lunarinfo = await getLunarMonthInfo(start);
  const ritu = await getRitu(start);
  const vedic = await getVedicDay(start);

  const surmoonrise = await getSunMoonRise(
    encodeURIComponent(
      `${address?.area?.name ?? "new delhi"} ${
        address?.city?.name ?? "delhi"
      } ${address?.country?.capital ?? "india"}`
    ),
    start
  );

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

const transformGoodBadTimes = (goodbadtimes) => {
  const goodbadtimesMap = {};
  if (goodbadtimes == null) {
    return {};
  }
  Object.entries(goodbadtimes)
    .filter(([key, value]) => muhuratData[key] != null)
    .map(([key, value]) => {
      goodbadtimesMap[key] = value;
      goodbadtimesMap[key].name = muhuratData[key].name;
      goodbadtimesMap[key].desc = muhuratData[key].desc;
    });
  return goodbadtimesMap;
};

module.exports = {
  createEvent,
  getEventsById,
  getEventsBwDays,
};
