const FreeAstrologyClient = require("./../client/free_astrology_client");

const API_KEY = "kSEykULbdl9JpAfq91o54VI6AJ5iS286kgzKc0E2";
const BASE_URL = "https://json.freeastrologyapi.com/";
const client = new FreeAstrologyClient(API_KEY, BASE_URL);

const getTithi = async (body) => {
  const st = new Date(body);
  const key = `tithi-durations-${st.getDate()}-${
    st.getMonth() + 1
  }-${st.getYear()}`;
  const bb = JSON.stringify({
    year: st.getFullYear(),
    month: st.getMonth() + 1,
    date: st.getDate(),
    hours: st.getHours(),
    minutes: st.getMinutes(),
    seconds: st.getSeconds(),
    latitude: 23.1765,
    longitude: 75.7885,
    timezone: 5.5,
    config: {
      observation_point: "topocentric",
      ayanamsha: "lahiri",
    },
  });
  try {
    const response = await client.post("tithi-durations", bb, key);
    return JSON.parse(response.output);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getNakshatra = async (body) => {
  const st = new Date(body);
  const key = `nakshatra-durations-${st.getDate()}-${
    st.getMonth() + 1
  }-${st.getYear()}`;
  const bb = JSON.stringify({
    year: st.getFullYear(),
    month: st.getMonth() + 1,
    date: st.getDate(),
    hours: st.getHours(),
    minutes: st.getMinutes(),
    seconds: st.getSeconds(),
    latitude: 23.1765,
    longitude: 75.7885,
    timezone: 5.5,
    config: {
      observation_point: "topocentric",
      ayanamsha: "lahiri",
    },
  });
  try {
    const response = await client.post("nakshatra-durations", bb, key);
    return JSON.parse(response.output);
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  getTithi,
  getNakshatra,
};
