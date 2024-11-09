const { notFound } = require("../constants/statusCodes");

module.exports = (req, res, next) => {
  const err = new Error("Not Found");
  res.status(notFound).json({
    error: {
      message: err.message,
    },
  });
};
