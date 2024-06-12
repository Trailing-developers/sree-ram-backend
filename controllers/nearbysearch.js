const {
  getNearbyTempleFromRepo,
  getNearbyHotelsFromRepo,
  getNearbyAshramFromRepo,
} = require("../repository/nearbysearch");

const getNearbyTemples = (req, res) => {
  const { lat, lng } = req.query;
  getNearbyTempleFromRepo(lat, lng)
    .then((data) => {
      res.json({ success: true, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, message: err });
    });
};

const getNearbyHotels = (req, res) => {
  const { lat, lng } = req.query;
  getNearbyHotelsFromRepo(lat, lng)
    .then((data) => {
      res.json({ success: true, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, message: err });
    });
};

const getNearbyAshram = (req, res) => {
  const { lat, lng } = req.query;
  getNearbyAshramFromRepo(lat, lng)
    .then((data) => {
      res.json({ success: true, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, message: err });
    });
};

module.exports = {
  getNearbyHotels,
  getNearbyTemples,
  getNearbyAshram,
};
