import type { Hooks } from "./types";

export const ESLINT_OPTIONS = [
  "eslint-config-typescript-airbnb-prettier-svelte",
  "eslint-config-typescript-airbnb-prettier",
];
export const FRAMEWORK_OPTIONS = ["svelte", "react", "vue"];

export const BASE_GITHUB_BADGE_URL = `https://github.com/<OWNER>/<REPOSITORY>/actions/workflows/<WORKFLOW_FILE>/badge.svg`;

export const HOOKS: Array<Hooks> = [
  {
    name: "pre-commit",
    action: "npm run lint",
  },
  {
    name: "pre-push",
    action: "npm run test",
  },
  // {
  //   name: "pre-commit",
  //   action: "do something to prevent commiting on master",
  // },
];

export const PRETTIER_FILE_CONTENT = `{
  "printWidth": 100
}\n`;

export const ESLINT_IGNORE_CONTENT = `.eslintrc.js
node_modules/**
`;

export const PRETTIER_IGNORE_CONTENT = `node_modules/**`;

export const setEslintFileContents = (eslint: string): string => `module.exports = {
  extends: "${eslint.split("eslint-config-")[1]}",
};\n`;
