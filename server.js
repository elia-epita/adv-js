const express = require("express");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");

// Custom middleware
const cors = require("cors");
const helmet = require("helmet");

// Routers
const todoRouter = require("./routes/todo.routes");

try {
  mongoose.connect("mongodb://localhost:27017/epita");
} catch (error) {
  console.log("Error connecting to MongoDB", error);
}

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/todos", todoRouter);

app.get("/", (req, res) => {
  console.log("Here");
  res.status(200).json({ message: "Bye" });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
