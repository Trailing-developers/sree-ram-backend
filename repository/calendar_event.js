const FreeAstrologyClient = require("./../client/free_astrology_client");

const API_KEY = "kSEykULbdl9JpAfq91o54VI6AJ5iS286kgzKc0E2";
const BASE_URL = "https://json.freeastrologyapi.com/";
const client = new FreeAstrologyClient(API_KEY, BASE_URL);

const getPanchang = async (body) => {
  const st = new Date(body);
  const key = `complete-panchang-${st.getDate()}-${
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
    const response = await client.post("complete-panchang", bb, key);
    return response.output;
  } catch (e) {
    console.log(e);
    return null;
  }
};


const getGoodBadTimes = async (body) => {
  const st = new Date(body);
  const key = `good-bad-times-${st.getDate()}-${
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
    const response = await client.post("good-bad-times", bb, key);

    return {abhijit_data: JSON.parse(response.abhijit_data), amrit_kaal_data: JSON.parse(response.amrit_kaal_data), brahma_muhurat_data: JSON.parse(response.brahma_muhurat_data), rahu_kaalam_data: JSON.parse(response.rahu_kaalam_data), yama_gandam_data: JSON.parse(response.yama_gandam_data), gulika_kalam_data: JSON.parse(response.gulika_kalam_data), dur_muhurat_data: JSON.parse(response.dur_muhurat_data), varjyam_data: JSON.parse(response.varjyam_data) };
  } catch (e) {
    console.log(e);
    return null;
  }
};


module.exports = {
  getPanchang,
  getGoodBadTimes
};
