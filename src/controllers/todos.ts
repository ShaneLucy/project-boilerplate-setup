import { TODOS, FRONT_END_TODOS } from "../globals";
import { FRAMEWORK } from "./framework";
import { OWNER, REPOSITORY } from "./git";

interface Args {
  framework: string;
  todos: Array<string>;
  frontEndTodos: Array<string>;
  owner: string;
  repository: string;
}

export const setProjectTodos = (args: Args): Array<string> => {
  let todos: Array<string> = [];
  if (args.framework.length === 0) {
    todos = args.todos;
  } else {
    todos = [...args.todos, ...args.frontEndTodos];
  }

  if (!args.owner) {
    todos.push("\n - Replace all <OWNER>");
  }

  if (!args.repository) {
    todos.push("\n - Replace all <REPOSITORY>");
  }

  return todos;
};

export const PROJECT_TODOS = setProjectTodos({
  framework: FRAMEWORK,
  todos: TODOS,
  frontEndTodos: FRONT_END_TODOS,
  owner: OWNER,
  repository: REPOSITORY,
});
