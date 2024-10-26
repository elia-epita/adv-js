const express = require("express");
const app = express();
const PORT = 8080;

// Custom middleware
const cors = require("cors");
const helmet = require("helmet");

// Routers
const todoRouter = require("./routes/todo.routes");

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
