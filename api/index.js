const express = require("express");
const app = express();

const cors = require("cors");

const db = require("../lib/models/index");

db.sequelize.sync(); // force: true for resetting

const logger = require("morgan");

app.use((req, res, next) => {
  if (req.method == "GET") {
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  } else {
    // for the other requests set strict no caching parameters
    res.setHeader("Cache-control", `no-store`);
  }

  next();
});

app.use(logger("dev"));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("../lib/routes/user.routes")(app);
require("../lib/routes/task.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT);
