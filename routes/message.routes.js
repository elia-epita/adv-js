const router = require("express").Router();

const messageController = require("../controllers/message.controller");

router.get("/", messageController.getMessages);
// router.get("/:messageId");
// router.post("/add/message");
// router.put("/edit/:messageId");

module.exports = router;
