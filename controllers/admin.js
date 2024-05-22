const {
  getHomeBanners,
  getHomeCalendarBanners,
} = require("../repository/widget");

const updateSuccess = (req, res) => {
  const { name, email } = req.body;
  res.render("success", { name: name });
};

const createOption = (req, res) => {
  const types = ["katha", "mantra", "banners", "home_calendar_banner"];
  res.render("create", { types });
};

const createPage = (req, res) => {
  const type = req.params.type;
  getPageContent(type).then((content) => {
    res.render(`create/add_${type}`, { type, content });
  });
};

const default_banners = {
  data: {
    title: null,
    imgUrl: null,
    body: null,
  },
};
async function getPageContent(type) {
  if (type === "banners") {
    const banners = await getHomeBanners();
    return banners;
  } else if (type === "home_calendar_banner") {
    const banners = await getHomeCalendarBanners();
    if (!banners || banners == null) {
      return default_banners;
    }
    return banners;
  }
  return null;
}

module.exports = {
  updateSuccess,
  createOption,
  createPage,
};
