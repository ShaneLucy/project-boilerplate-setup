import { TODOS, FRONT_END_TODOS } from "../globals";
import { FRAMEWORK } from "./framework";
import { OWNER, REPOSITORY } from "./git";

const setProjectTodos = (): Array<string> => {
  let todos: Array<string> = [];
  if (FRAMEWORK.length === 0) {
    todos = TODOS;
  } else {
    todos = [...TODOS, ...FRONT_END_TODOS];
  }

  if (!OWNER) {
    todos.push("\n - Replace all <OWNER>");
  }

  if (!REPOSITORY) {
    todos.push("\n - Replace all <REPOSITORY>");
  }

  return todos;
};

export default setProjectTodos();
