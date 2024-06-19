const { getAllEventsBetweenDates } = require("../repository/event");

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

const getDatesInMonth = async (req, res) => {
  const { year, month } = req.params;
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const allEvents = await getAllEventsBetweenDates(startDate, endDate);
  const dates = [];

  const festMap = {};
  allEvents
    .filter((event) => event.eventType.toLowerCase() === "festival")
    .map((event) => {
      if (!festMap[event["start"].getDate()]) {
        festMap[event["start"].getDate()] = [];
      }
      festMap[event["start"].getDate()].push(event["name"]);
    });

  const ekadashiMap = {};
  allEvents
    .filter((event) => event.eventType.toLowerCase() === "ekadashi")
    .map((event) => {
      if (!ekadashiMap[event["start"].getDate()]) {
        ekadashiMap[event["start"].getDate()] = [];
      }
      ekadashiMap[event["start"].getDate()].push(event["name"]);
    });

  const purnimaMap = getEventFromRepo(allEvents, "purnima");
  const prodashvratMap = getEventFromRepo(allEvents, "prodashvrat");
  const mashikshivratrivratMap = getEventFromRepo(
    allEvents,
    "mashikshivratrivrat"
  );

  const amavasyaMap = getEventFromRepo(allEvents, "amavasya");
  const sankashtichaturthiMap = getEventFromRepo(
    allEvents,
    "sankashtichaturthi"
  );
  const sawansomvarvratMap = getEventFromRepo(allEvents, "sawansomvarvrat");
  const navratriMap = getEventFromRepo(allEvents, "navratri");

  let currentDate = startDate;

  while (currentDate <= endDate) {
    const cd = new Date(currentDate);
    dates.push({
      date: cd.getDate(),
      year: cd.getFullYear(),
      weekday: cd.getDay(),
      festival: festMap[currentDate.getDate()],
      ekadashi: ekadashiMap[currentDate.getDate()],
      purnima: purnimaMap[currentDate.getDate()],
      prodashvrat: prodashvratMap[currentDate.getDate()],
      mashikshivratrivrat: mashikshivratrivratMap[currentDate.getDate()],
      amavaya: amavasyaMap[currentDate.getDate()],
      sankashtichaturthi: sankashtichaturthiMap[currentDate.getDate()],
      sawansomvarvrat: sawansomvarvratMap[currentDate.getDate()],
      navratri: navratriMap[currentDate.getDate()],
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }
  res.json(dates);
};

const getEventFromRepo = (allEvents, type) => {
  const purnimaMap = {};
  allEvents
    .filter((event) => event.eventType.toLowerCase() === type)
    .map((event) => {
      if (!purnimaMap[event["start"].getDate()]) {
        purnimaMap[event["start"].getDate()] = [];
      }
      purnimaMap[event["start"].getDate()].push(event["name"]);
    });
  return purnimaMap;
};

module.exports = {
  getDatesInMonth,
};
