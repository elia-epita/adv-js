const router = require("express").Router();

const messageController = require("../controllers/message.controller");

router.get("/", messageController.getMessages);
router.put("/edit/:messageId", messageController.editMessage);
router.get("/message/:messageId", messageController.getMessageById);
router.get("/user", messageController.getMessagesByUser);
router.post("/add", messageController.addMessage);

module.exports = router;
