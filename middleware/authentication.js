const jwt = require("jsonwebtoken");
const { unauthorized } = require("../constants/statusCodes");

const verifyToken = (req, res, next) => {
  // check for a token in the header
  const token = req.header("Authorization"); // format: 'Bearer <token>'

  // if no token is present, send back unauthorized
  if (!token) {
    return res.status(unauthorized).json({ message: "Unauthorized" });
  }

  // verify the validity of the token
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
    req.user = decoded.user;
    console.log(req.user);
  } catch (error) {
    console.log(error.message);
    return res.status(unauthorized).json({ message: "Invalid token" });
  }

  next();
};

module.exports = verifyToken;
