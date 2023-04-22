const express = require("express");
const cors = require("cors");

require("dotenv").config();
const commonRouter = require("./routes/common.routes");
const { authenticateNormalUser, authenticateAdmin } = require('./middlewares/auth');

const app = express();

app.use(cors({}));

// parse requests of content-type - application/json & application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// connecting to Mysql
const db = require("./models");
db.sequelize
  .sync
  // { alter: true } // Alter if Any changes..
  // { force: true } // drop the table if it already exists
  ()
  .then(() => {
    console.log("Synced db.");
  })
  .then(() => {
    // set port, listen for requests
    const PORT = process.env.NODE_PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Group Chat Service!!." });
});

app.use(
  "/api/user",
  commonRouter
);
app.use(
  "/api/admin",
  authenticateAdmin,
  commonRouter
);
app.use(
  "/api/groups",
  authenticateNormalUser,
  commonRouter
);
app.use(
  "/api/messages",
  authenticateNormalUser,
  commonRouter
);

module.exports = app;