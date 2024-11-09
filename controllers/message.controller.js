const {
  queryError,
  success,
  missingParameters,
} = require("../constants/statusCodes");
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

const getMessagesByUser = async (req, res) => {
  try {
    const messages = await messageModel.find({ user: req.user.id });
    return res.status(success).json(messages);
  } catch (error) {
    console.log("error getting messages for user", error.message);
    return res
      .status(queryError)
      .json({ error: "Error while getting messages" });
  }
};

const getMessageById = async (req, res) => {
  const { messageId } = req.params;
  let message;

  try {
    message = await messageModel.findById(messageId);
  } catch (error) {
    console.log("error getting message", error.message);
    return res
      .status(queryError)
      .json({ error: "Error while getting message" });
  }

  return res.status(success).json(message);
};

const addMessage = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res
      .status(missingParameters)
      .json({ message: "missing parameters" });
  }

  message.user = req.user.id;

  try {
    const messageObj = new messageModel(message);
    await messageObj.save();

    return res.status(success).json(messageObj);
  } catch (error) {
    console.log("error adding message");
    return res.status(queryError).json({ error: "Error while adding message" });
  }
};

const editMessage = async (req, res) => {
  const { messageId } = req.params;
  const { name } = req.body;

  if (!messageId || !name) {
    return res
      .status(missingParameters)
      .json({ message: "missing parameters" });
  }

  try {
    const message = await messageModel.findByIdAndUpdate(
      messageId,
      {
        name,
      },
      {
        new: true,
      }
    );

    return res.status(success).json(message);
  } catch (error) {
    console.log("error editing message", error.message);
    return res.status(queryError).json({ error: "Error while adding message" });
  }
};

module.exports = {
  getMessages,
  addMessage,
  editMessage,
  getMessageById,
  getMessagesByUser,
};
