import type { Hooks, GithubActions } from "./types";

export const ESLINT_OPTIONS = [
  "eslint-config-typescript-airbnb-prettier-svelte",
  "eslint-config-typescript-airbnb-prettier",
];
export const FRAMEWORK_OPTIONS = ["svelte", "react", "vue"];

export const setGithubBadgeUrl = (owner: string, repository: string, file: string): string =>
  `https://github.com/${owner}/${repository}/actions/workflows/${file}/badge.svg`;

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

export const GITHUB_ACTIONS: Array<GithubActions> = [
  {
    name: "lint-test",
    action: `name: lint & test

on:
  push:

jobs:
  lint-test:
    runs-on: macos-latest

    steps:
      - name: Checkout current repository
        uses: actions/checkout@v2
      - name: Setup NodeJs
        uses: actions/setup-node@v2
        with:
          node-version: "lts/*"
      - name: Update npm
        run: npm install -g npm@latest
      - name: Install dependencies
        run: npm i
      - name: Lint
        run: npm run lint
      - name: Run tests
        run: npm run test
`,
  },
  {
    name: "build",
    action: `name: build

on:
  pull_request:

jobs:
  build:
    runs-on: macos-latest

    steps:
      - name: Checkout current repository
        uses: actions/checkout@v2
      - name: Setup NodeJs
        uses: actions/setup-node@v2
        with:
          node-version: "lts/*"
      - name: Update npm
        run: npm install -g npm@latest
      - name: Install dependencies
        run: npm i
      - name: Build
        run: npm run build
`,
  },
];
