const messageModel = require("../models/messageModel");

const getMessages = async (req, res) => {
  try {
    const messages = await messageModel
      .find({})
      .sort({ created_at: "desc" })
      .populate("user");

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error getting messages", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMessages,
};
