const {
  addBannersWidget,
  getHomeWidgets,
  getDarshanWidgets,
  addWidget,
} = require("../repository/widget");

const getHome = (req, res) => {
  const response = getHomeWidgets();
  response
    .then((homeWidgets) => {
      res.json({ status: "success", data: homeWidgets });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", message: err.message });
    });
};

const getDarshan = (req, res) => {
  const response = getDarshanWidgets();
  response
    .then((darshanWidget) => {
      res.json({ status: "success", data: darshanWidget });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", message: err.message });
    });
};

const createHomeBanner = (req, res) => {
  const items = req.body;
  const bannerJsonBody = createBannerBody(items);
  const response = addWidget("HOME", "BANNER", bannerJsonBody);
  response
    .then((data) => {
      res.json({ status: "success", message: "Banner created successfully." });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", message: err.message });
    });
};

const createCalanderBanner = (req, res) => {
  const items = req.body;
  const bannerJsonBody = createBannerBody(items);
  const response = addWidget("HOME", "CALENDAR_BANNER", bannerJsonBody);
  response
    .then((data) => {
      res.json({
        status: "success",
        message: "HOME_CALENDAR_BANNER created successfully.",
      });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", message: err.message });
    });
};

const createDarshanBanner = (req, res) => {
  const items = req.body;
  const bannerJsonBody = createBannerBody(items);
  const response = addWidget("DARSHAN", "BANNER", bannerJsonBody);
  response
    .then((data) => {
      res.json({
        status: "success",
        message: "DARSHAN_BANNER created successfully.",
      });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", message: err.message });
    });
};

function createBannerBody(items) {
  bannerJsonBody = [];

  // check if this is only single element than don't run the for loop
  if (!Array.isArray(items.title)) {
    bannerJsonBody.push({
      title: items.title,
      body: items.body,
      imgUrl: items.imgUrl,
    });
    return bannerJsonBody;
  }
  for (let i = 0; i < items.title.length; i++) {
    bannerJsonBody.push({
      title: items.title[i],
      body: items.body[i],
      imgUrl: items.imgUrl[i],
    });
  }

  return bannerJsonBody;
}

const createDarshanWidgets = (req, res) => {
  const items = req.body;
  const response = addWidget("DARSHAN", "WIDGETS", items);
  response
    .then((data) => {
      res.json({
        status: "success",
        message: "DARSHAN_WIDGETS created successfully.",
      });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", message: err.message });
    });
};

module.exports = {
  createHomeBanner,
  createCalanderBanner,
  createDarshanBanner,
  createDarshanWidgets,
  getHome,
  getDarshan,
};
