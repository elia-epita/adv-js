const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: "missing information" });
  }

  try {
    const hash = bcrypt.hashSync(password, 10); // hashing and salting our password

    const User = new userModel({
      email, // this is the equivalent of writing email: email
      username,
      password: hash,
    });

    const user = await User.save();
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error creating user", error);
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "missing information" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(500).json({ message: "email or password incorrect" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(500).json({ message: "email or password incorrect" });
    }

    req.session.user = {
      _id: user._id,
    };

    const token = jwt.sign(
      { user: { id: user._id, email: user.email } },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    console.log(req.session.user);

    return res.status(200).json({ token });
  } catch (error) {
    console.log("Error logging user", error);
    return res.status(500).json({ error: "error logging in" });
  }
};

const logout = async (req, res) => {
  if (req.sessoin.user) {
    delete req.session.user;
  }

  return res.status(204);
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.session.user._id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "error getting user" });
  }
};

module.exports = {
  register,
  login,
  getUser,
  logout
};
