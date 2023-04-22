const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const models = db.sequelize.models;
const User = models.user;

const userController = {
  createUser: async (req, res, next) => {
    const { name, email, password, isAdmin } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin,
      });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: "User creation failed", error: err });
    }
  },

  updateUser: async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
      const user = await User.findByPk(req.params.userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
        }
        if (isAdmin !== undefined) user.isAdmin = isAdmin;
        await user.save();
        res.json(user);
      }
    } catch (err) {
      res.status(400).json({ message: "User update failed", error: err });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
      const user = await User.findOne({ where: { email } });
      console.log("user", user);
      if (!user) {
        res.status(401).json({ message: "Invalid email or password" });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("isMatch", isMatch);

        if (!isMatch) {
          res.status(401).json({ message: "Invalid email or password" });
        } else {
          const token = jwt.sign(
            { userId: user.id, isAdmin: user.isAdmin },
            "secret"
          );
          res.json({ token });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "User login failed", error: err });
    }
  },
};

module.exports = userController;
