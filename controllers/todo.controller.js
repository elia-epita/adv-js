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

  if (isNaN(position) || position < 0 || position >= todos.length) {
    res.status(400).json({ error: "index should be a correct number" });
  } else {
    res.status(200).json({ todo: todos[position] });
  }
};

const updateTodaAtIndex = (req, res) => {
  const { index } = req.params;
  const { todo } = req.body;

  const position = parseInt(index);

  if (isNaN(position) || position < 0 || position >= todos.length) {
    res.status(400).json({ error: "index should be a correct number" });
  } else if (!todo) {
    res.status(400).json({ error: "missing todo" });
  } else {
    todos[position] = todo;
    res.status(200).json(todos);
  }
};
// edit a specific todo item
// delete a specific todo item

module.exports = {
  getTodos,
  addTodo,
  getTodoAtIndex,
  updateTodaAtIndex,
};
