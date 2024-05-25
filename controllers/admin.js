const { DARSHAN_WIDGETS } = require("../mocks");
const {
  getHomeBanners,
  getHomeCalendarBanners,
  getDarshanBanners,
  getDarshanWidgets,
  getDarshanWidgetList,
} = require("../repository/widget");

const updateSuccess = (req, res) => {
  const { name, email } = req.body;
  res.render("success", { name: name });
};

const createOption = (req, res) => {
  const types = [
    "katha",
    "mantra",
    "banners",
    "home_calendar_banner",
    "darshan_banner",
    "darshan_widgets",
  ];
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
const default_array_banner = {
  data: [
    {
      title: null,
      imgUrl: null,
      body: null,
    },
  ],
};
const default_array_widgets = {
  data: [
    {
      widgetTitle: null,
      items: [
        {
          name: null,
          place: null,
          imgUrl: null,
          pageId: null,
        },
      ],
    },
  ],
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
  } else if (type === "darshan_banner") {
    const banners = await getDarshanBanners();
    if (!banners || banners == null) {
      return default_array_banner;
    }
    return banners;
  } else if (type === "darshan_widgets") {
    const data = await getDarshanWidgetList();
    if (!data || data == null) {
      return default_array_widgets;
    }
    console.log(JSON.stringify(data));
    return data;
  }
  return null;
}

module.exports = {
  updateSuccess,
  createOption,
  createPage,
};
