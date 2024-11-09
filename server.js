require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");

// Custom middleware
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

// Routers
const todoRouter = require("./routes/todo.routes");
const messageRouter = require("./routes/message.routes");
const userRouter = require("./routes/user.routes");

try {
  mongoose.connect("mongodb://localhost:27017/epita");
} catch (error) {
  console.log("Error connecting to MongoDB", error);
}

app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/todos", todoRouter);
app.use("/messages", messageRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  console.log("Here");
  res.status(200).json({ message: "Bye" });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
