import type { Hooks } from "../../types";

const HOOKS: Array<Hooks> = [
  {
    name: "pre-commit",
    action: "npm run lint",
  },
  {
    name: "pre-push",
    action: "",
  },
];

export default HOOKS;
