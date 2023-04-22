const express = require("express");
const userController = require("../controllers/user.controller.js");
const groupChatController = require("../controllers/groupchat.controller.js");
const router = express.Router();

// User Routes
router.post("/users", userController.createUser);
router.put("/users/:userId", userController.updateUser);
router.post("/login", userController.login);

// Group Chat Routes
router.post("/", groupChatController.createGroup);
router.post("/:groupId/members", groupChatController.addMembersToGroup);
router.post("/:groupId/messages", groupChatController.sendMessage);
router.get("/", groupChatController.getGroup);
router.delete("/:groupId", groupChatController.deleteGroup);

// Messages Route
router.post("/:messageId/like", groupChatController.likeMessage);


module.exports = router;
