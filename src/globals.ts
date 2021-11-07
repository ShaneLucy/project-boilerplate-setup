import type { Hooks, GithubActions, Shield } from "./types";

export const ESLINT_OPTIONS = [
  "eslint-config-typescript-airbnb-prettier-svelte",
  "eslint-config-typescript-airbnb-prettier",
];
export const FRAMEWORK_OPTIONS = ["svelte", "react", "vue"];

export const setGithubShieldUrl = (owner: string, repository: string, file: string): Shield => ({
  name: file,
  url: `https://github.com/${owner}/${repository}/actions/workflows/${file}.yml/badge.svg`,
});

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
  {
    name: "coverage",
    action: `name: Code Test Coverage

on:
  push:
  pull_request:

jobs:
  coverage:
    runs-on: ubuntu-latest

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
      - name: Generate Coverage Report
        run: npm run coverage
      - name: Coveralls GitHub Action
        uses: coverallsapp/github-action@master
        with:
          github-token: \${{ secrets.GITHUB_TOKEN }}
`,
  },
];

export const FRONT_END_SHIELD_URLS: Array<Shield> = [
  {
    name: "W3C Markup Validation score",
    url:
      "https://img.shields.io/w3c-validation/default?targetUrl=https%3A%2F%2Fsolar-system.pages.dev%2F",
  },
  {
    name: "Security headers",
    url: "https://img.shields.io/security-headers?url=https%3A%2F%2Fsolar-system.pages.dev",
  },
  {
    name: "Mozilla Observatory Score",
    url: "https://img.shields.io/mozilla-observatory/grade-score/solar-system.pages.dev",
  },
  {
    name: "Uptime Percentage last 30 days",
    url: "https://img.shields.io/uptimerobot/ratio/:monitorSpecificKey",
  },
  { name: "Uptime status", url: "https://img.shields.io/uptimerobot/status/:monitorSpecificKey" },
];

// if project is front-end also add a todo to link project with uptime

export const SHIELD_URLS: Array<Shield> = [
  { name: "Code Issues", url: "https://img.shields.io/codeclimate/issues/:owner/:repo" },
  { name: "Tech Debt", url: "https://img.shields.io/codeclimate/tech-debt/:owner/:repo" },
  {
    name: "Code Quality",
    url: "https://img.shields.io/codefactor/grade/github/:owner/:repo/master",
  },
  {
    name: "Vulnerabilities",
    url: "https://img.shields.io/snyk/vulnerabilities/github/:owner/:repo",
  },
  { name: "Dependency Status", url: "https://img.shields.io/librariesio/github/:owner/:repo" },
  { name: "Code Size", url: "https://img.shields.io/github/languages/code-size/:owner/:repo" },
  { name: "Repo Size", url: "https://img.shields.io/github/repo-size/:owner/:repo" },
  { name: "Issues", url: "https://img.shields.io/github/issues-raw/:owner/:repo" },
  { name: "Last Commit", url: "https://img.shields.io/github/last-commit/:owner/:repo" },
  {
    name: "Test Coverage",
    url: "https://coveralls.io/repos/github/:owner/:repo/badge.svg?branch=master",
  },
  {
    name: "Sonar Cloud Quality Gate",
    url:
      "https://sonarcloud.io/api/project_badges/measure?project=:owner_:repo&metric=alert_status",
  },
];

export const FRONT_END_TODOS = [
  "\n - Link project with uptime",
  "\n - Set URL for:\n - W3c Validator Badge\n - Security Headers Badge\n - Observatory Badge",
];

export const TODOS = [
  "\n - Link project with https://sonarcloud.io/",
  "\n - Link project with https://coveralls.io/",
  "\n - Link project with https://libraries.io/",
  "\n - Link project with https://snyk.io/",
  "\n - Link project with https://www.codefactor.io/",
];

export const README_CONTENT = `# Project Title

Simple overview of use/purpose.

## Description

An in-depth paragraph about your project and overview of use.

## Getting Started

### Dependencies

- Describe any prerequisites, libraries, OS version, etc., needed before installing program.
- ex. Windows 10

### Installing

- How/where to download your program
- Any modifications needed to be made to files/folders

### Executing program

- How to run the program
- Step-by-step bullets\n
\`\`\`
code blocks for commands
\`\`\`

## Help

Any advise for common problems or issues.\n
\`\`\`
command to run if program contains helper info
\`\`\`

## Authors

Contributors names and contact info

ex. Dominique Pizzie  
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

- 0.2
  - Various bug fixes and optimizations
  - See [commit change]() or See [release history]()
- 0.1
  - Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details
`;
