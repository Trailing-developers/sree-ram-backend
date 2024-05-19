const express = require("express");
const morgan = require("morgan");
var cors = require("cors");
const path = require("path");

const indexRouter = require("./routes/index");
const kathaRouter = require("./routes/katha_api");

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(morgan("dev"));
app.use(cors());

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
app.use("/api", kathaRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
