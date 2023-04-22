// middleware/auth.js
const jwt = require("jsonwebtoken");
const db = require("../models");
const models = db.sequelize.models;
const User = models.user;

const authenticateNormalUser = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, "secret");
    const user = await User.findOne({ where: { id: decoded.userId, isAdmin: false } });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Please authenticate" });
  }
};

const authenticateAdmin = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, "secret");

    const user = await User.findOne({
      where: { id: decoded.userId, isAdmin: true },
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = { authenticateNormalUser, authenticateAdmin };
