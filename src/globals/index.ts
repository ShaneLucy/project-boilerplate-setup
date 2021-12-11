import type { Hooks, GithubActions } from "../types";
import { BUILD, COVERAGE, LINT_TEST } from "./workflows";

export { default as README_CONTENT } from "./readme";
export { default as SHARED_SHIELDS } from "./shields/shared";
export { default as FRONT_END_SHIELDS } from "./shields/front-end";

export const ESLINT_OPTIONS = [
  "eslint-config-typescript-airbnb-prettier-svelte",
  "eslint-config-typescript-airbnb-prettier",
];
export const FRAMEWORK_OPTIONS = ["svelte", "react", "vue"];

export const HOOKS: Array<Hooks> = [
  {
    name: "pre-commit",
    action: "npm run lint",
  },
  {
    name: "pre-push",
    action: "npm run test",
  },
];

export const PRETTIER_FILE_CONTENT = `{
  "printWidth": 100
}\n`;

export const ESLINT_IGNORE_CONTENT = `.eslintrc.js
node_modules/**
`;

export const PRETTIER_IGNORE_CONTENT = `node_modules/**`;

export const LINT_SCRIPT = "prettier --write . && eslint src/**";
export const LINT_FIX_SCRIPT = "prettier --write . && eslint src/** --fix";

export const STYLELINT_FILE_CONTENTS = `{
  "extends": "stylelint-config-standard"
}\n
`;

export const JEST_FILE_CONTENTS = `/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};\n`;

export const GITHUB_ACTIONS: Array<GithubActions> = [
  {
    name: "lint-test",
    action: LINT_TEST,
  },
  {
    name: "build",
    action: BUILD,
  },
  {
    name: "coverage",
    action: COVERAGE,
  },
];

export const FRONT_END_TODOS = [
  "\n- Link project with https://uptimerobot.com/",
  "\n\n Set URL for:\n - W3c Validator Badge\n - Security Headers Badge\n - Observatory Badge",
];

export const TODOS = [
  "\n- Link project with https://sonarcloud.io/",
  "\n- Link project with https://coveralls.io/",
  "\n- Link project with https://snyk.io/",
  "\n- Link project with https://www.codefactor.io/",
];
