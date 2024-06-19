const express = require("express");
const morgan = require("morgan");
var cors = require("cors");
const path = require("path");

// admin route
const indexRouter = require("./routes/index");

// middleware - app
const { clientIpMiddleware } = require("./middleware/clientIp");

// exposed - app
const kathaRouter = require("./routes/katha_api");
const mantraRouter = require("./routes/mantras");
const widgetRouter = require("./routes/widgets");
const templeRouter = require("./routes/temple");
const godRouter = require("./routes/gods");
const address = require("./routes/address");
const eventRouter = require("./routes/event");
const trackRouter = require("./routes/tracks");
const nearbySearchRouter = require("./routes/nearbysearch");
const calendarRouter = require("./routes/calendar");

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//get trusted proxy
app.set("trust proxy", true);

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(clientIpMiddleware);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/api", [
  kathaRouter,
  mantraRouter,
  widgetRouter,
  templeRouter,
  godRouter,
  address,
  eventRouter,
  trackRouter,
  nearbySearchRouter,
  calendarRouter,
]);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
