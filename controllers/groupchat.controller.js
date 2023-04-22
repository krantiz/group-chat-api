const db = require("../models");
const models = db.sequelize.models;
const User = models.user;
const Group = models.group;
const Message = models.message;
const Op = db.DataTypes.Op;

const groupChatController = {
  createGroup: async (req, res) => {
    try {
      const group = await Group.create(req.body);
      res.status(201).json(group);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  deleteGroup: async (req, res) => {
    try {
      const group = await Group.findByPk(req.params.groupId);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      await group.destroy();
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getGroup: async (req, res) => {
    try {
      const groups = await Group.findAll({
        where: {
          name: {
            [Op.like]: `%${req.query.q}%`,
          },
        },
      });
      res.json(groups);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  addMembersToGroup: async (req, res) => {
    try {
      const group = await Group.findByPk(req.params.groupId);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      const { userIds } = req.body;
      await group.addUsers(userIds);
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  sendMessage: async (req, res) => {
    try {
      const group = await Group.findByPk(req.params.groupId);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const message = await Message.create({
        content: req.body.content,
        userId: user.id,
        groupId: group.id,
      });
      res.status(201).json(message);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  likeMessage: async (req, res) => {
    try {
      const message = await Message.findByPk(req.params.messageId);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      await message.increment("likes");
      res.status(201).json({ message: "Like count incremented" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = groupChatController;
