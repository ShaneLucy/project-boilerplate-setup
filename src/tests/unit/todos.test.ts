import { setProjectTodos } from "../../controllers/todos";

describe("testing that the correct todos are set depending on project configuration", () => {
  test("that if the framework isn't set, the front-end todos aren't included in project todos", () => {
    const TODOS = setProjectTodos({
      framework: "",
      todos: ["do this", "do that"],
      frontEndTodos: ["do something else"],
      owner: "Shane",
      repository: "project-boilerplate-setup",
    });

    expect(TODOS).toEqual(["do this", "do that"]);
  });

  test("that if the framework is set, the front-end todos are included in project todos", () => {
    const TODOS = setProjectTodos({
      framework: "svelte",
      todos: ["do this", "do that"],
      frontEndTodos: ["do something else"],
      owner: "Shane",
      repository: "project-boilerplate-setup",
    });

    expect(TODOS).toEqual(["do this", "do that", "do something else"]);
  });

  test("that if the owner or repository aren't set the project todos contains a todo to replace pplaceholder values", () => {
    const TODOS = setProjectTodos({
      framework: "svelte",
      todos: ["do this", "do that"],
      frontEndTodos: ["do something else"],
      owner: "",
      repository: "",
    });

    expect(TODOS).toEqual([
      "do this",
      "do that",
      "do something else",
      "\n - Replace all <OWNER>",
      "\n - Replace all <REPOSITORY>",
    ]);
  });
});
