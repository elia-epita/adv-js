const chai = require("chai");
const { expect } = chai;

// importing the function that we will be using from the todo.service
const { getTodos, addTodo } = require("../controllers/todo.controller");

describe("getTodos function", () => {
  it("should return an empty list of todos", () => {
    const req = {};
    const res = {
      status: (code) => {
        res.statusCode = code;
        return res;
      },
      json: (data) => {
        // Assert that the response status code is 200
        expect(res.statusCode).to.equal(200);

        // Assert that the returned data is an empty array
        expect(data).to.eql(["Hello"]);
      },
    };

    // calling the function with the mocked request and response
    getTodos(req, res);
  });
});

describe("addTodo", () => {
  it("should add a todo to the list", () => {
    const req = {
      body: {
        todo: "New todo",
      },
    };
    const res = {
      status: (code) => {
        res.statusCode = code;
        return res;
      },
      json: (data) => {
        // asseert that the response status code is 200
        expect(res.statusCode).to.equal(200);

        // assert that the returned data is the added todo
        expect(data).to.eql(["Hello", "New todo"]);
      },
    };
    // call the function with the mocked request and response
    addTodo(req, res);
  });
});
