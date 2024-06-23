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

const getEventsByDates = async (req, res) => {
  const { start, end } = req.params;
  const startDate = new Date(start);
  const endDate = new Date(end);

  const allEvents = await getAllEventsBetweenDates(startDate, endDate);
  const dates = {};

  const festMap = getEventFromRepo(allEvents, "festival");

  const ekadashiMap = {};
  allEvents
    .filter((event) => event.eventType.toLowerCase() === "ekadashi")
    .map((event) => {
      if (!ekadashiMap[event["start"].getDate()]) {
        ekadashiMap[event["start"].getDate()] = [];
      }
      ekadashiMap[event["start"].getDate()].push({
        name: event["name"],
        type: event.eventType.toLowerCase(),
        image:
          "https://qph.cf2.quoracdn.net/main-qimg-54ee98a6068e74a35de39edcc85ac59f-lq",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIe8S22aHWeSWqOgwhp3fhOZRyglHW3e3gYQ&usqp=CAU",
        shortDescr: "Ekadashi is a festival held on the 1st of every month.",
        longDescr:
          "Ekadashi is the 11th day after full moon and the new moon. On certain days,the body doesn not ask for food. If you fast on those days many health issue will be handled. For those who do not have the awareness, Ekadashi was fixed for fasting",
        videoIds: ["R8DErAx5ppk"],
      });
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
    if (
      !festMap[currentDate.getDate()] &&
      !ekadashiMap[currentDate.getDate()] &&
      !purnimaMap[currentDate.getDate()] &&
      !prodashvratMap[currentDate.getDate()] &&
      !mashikshivratrivratMap[currentDate.getDate()] &&
      !amavasyaMap[currentDate.getDate()] &&
      !sankashtichaturthiMap[currentDate.getDate()] &&
      !sawansomvarvratMap[currentDate.getDate()] &&
      !navratriMap[currentDate.getDate()]
    ) {
    } else {
      const year = cd.getFullYear();
      const month = cd.getMonth() + 1;
      const day = cd.getDate();
      if (!dates[year]) {
        dates[year] = {};
      }
      if (!dates[year][month]) {
        dates[year][month] = {};
      }
      if (!dates[year][month][day]) {
        dates[year][month][day] = [];
      }

      festMap[currentDate.getDate()]?.forEach((x) =>
        dates[year][month][day].push(x)
      );
      ekadashiMap[currentDate.getDate()]?.forEach((x) =>
        dates[year][month][day].push(x)
      );
      purnimaMap[currentDate.getDate()]?.forEach((x) =>
        dates[year][month][day].push(x)
      );
      prodashvratMap[currentDate.getDate()]?.forEach((x) =>
        dates[year][month][day].push(x)
      );
      mashikshivratrivratMap[currentDate.getDate()]?.forEach((x) =>
        dates[year][month][day].push(x)
      );
      amavasyaMap[currentDate.getDate()]?.forEach((x) =>
        dates[year][month][day].push(x)
      );
      sankashtichaturthiMap[currentDate.getDate()]?.forEach((x) =>
        dates[year][month][day].push(x)
      );
      sawansomvarvratMap[currentDate.getDate()]?.forEach((x) =>
        dates[year][month][day].push(x)
      );
      navratriMap[currentDate.getDate()]?.forEach((x) =>
        dates[year][month][day].push(x)
      );
    }
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
      purnimaMap[event["start"].getDate()].push({
        name: event["name"],
        type: event.eventType.toLowerCase(),
        image: event.image,
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIe8S22aHWeSWqOgwhp3fhOZRyglHW3e3gYQ&usqp=CAU",
        shortDescr: "Ekadashi is a festival held on the 1st of every month.",
        longDescr:
          "Ekadashi is the 11th day after full moon and the new moon. On certain days,the body doesn not ask for food. If you fast on those days many health issue will be handled. For those who do not have the awareness, Ekadashi was fixed for fasting",
        videoIds: ["R8DErAx5ppk"],
      });
    });
  return purnimaMap;
};

module.exports = {
  getDatesInMonth,
  getEventsByDates,
};
