const userModel = require("../models/userModel");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: "missing information" });
  }

  try {
    const User = new userModel({
      email, // this is the equivalent of writing email: email
      username,
      password,
    });

    const user = await User.save();
    console.log(user)
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error creating user", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
};
