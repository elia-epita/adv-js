const todos = [];

// get all todos
const getTodos = (req, res) => {
  res.status(200).json(todos);
};

const addTodo = (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    res.status(400).json({ error: "missing todo" });
  } else {
    todos.push(todo);
    res.status(200).json(todos);
  }
};

const getTodoAtIndex = (req, res) => {
  const { index } = req.params;

  const position = parseInt(index);
  console.log(typeof index, position);

  if (isNaN(position) || position < 0 || position >= todos.length) {
    res.status(400).json({ error: "index should be a correct number" });
  } else {
    res.status(200).json({ todo: todos[position] });
  }
};
// edit a specific todo item
// delete a specific todo item

module.exports = {
  getTodos,
  addTodo,
  getTodoAtIndex,
};
