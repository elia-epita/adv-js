const router = require("express").Router();

const todoController = require("../controllers/todo.controller");

router.get("/", todoController.getTodos);
router.post("/add", todoController.addTodo);
router.get("/:index", todoController.getTodoAtIndex);
router.put("/:index", todoController.updateTodaAtIndex);
router.delete("/:index", todoController.deleteTodo);

module.exports = router;
// get all todos
// create todo
// get a specific todo item
// edit a specific todo item
// delete a specific todo item
