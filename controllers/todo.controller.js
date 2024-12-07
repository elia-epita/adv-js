const todos = ['Hello'];

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

const deleteTodo = (req, res) => {
  const { index } = req.params;
  const position = parseInt(index);

  if (todos.length === 0) {
    res.status(400).json({ error: "cannot remove from empty list" });
  } else if (isNaN(position) || position < 0 || position >= todos.length) {
    res.status(400).json({ error: "index should be a correct number" });
  } else {
    todos.splice(index, 1);
    res.status(200).json(todos);
  }
};

module.exports = {
  getTodos,
  addTodo,
  getTodoAtIndex,
  updateTodaAtIndex,
  deleteTodo,
};
