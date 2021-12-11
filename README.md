[![lint](https://github.com/ShaneLucy/project-boilerplate-setup/actions/workflows/lint.yml/badge.svg)](https://github.com/ShaneLucy/project-boilerplate-setup/actions/workflows/lint.yml/badge.svg) [![build](https://github.com/ShaneLucy/project-boilerplate-setup/actions/workflows/build.yml/badge.svg)](https://github.com/ShaneLucy/project-boilerplate-setup/actions/workflows/build.yml/badge.svg) [![coverage](https://github.com/ShaneLucy/project-boilerplate-setup/actions/workflows/coverage.yml/badge.svg)](https://github.com/ShaneLucy/project-boilerplate-setup/actions/workflows/coverage.yml/badge.svg) [![test](https://github.com/ShaneLucy/project-boilerplate-setup/actions/workflows/test.yml/badge.svg)](https://github.com/ShaneLucy/project-boilerplate-setup/actions/workflows/test.yml/badge.svg) [![Code Issues](https://img.shields.io/codeclimate/issues/ShaneLucy/project-boilerplate-setup?logo=codeclimate&logoWidth=20)](https://img.shields.io/codeclimate/issues/ShaneLucy/project-boilerplate-setup?logo=codeclimate&logoWidth=20) [![Tech Debt](https://img.shields.io/codeclimate/tech-debt/ShaneLucy/project-boilerplate-setup?logo=codeclimate&logoWidth=20)](https://img.shields.io/codeclimate/tech-debt/ShaneLucy/project-boilerplate-setup?logo=codeclimate&logoWidth=20) [![Code Quality](https://img.shields.io/codefactor/grade/github/ShaneLucy/project-boilerplate-setup/master?logo=codefactor&logoWidth=20)](https://img.shields.io/codefactor/grade/github/ShaneLucy/project-boilerplate-setup/master?logo=codefactor&logoWidth=20) [![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/ShaneLucy/project-boilerplate-setup?logo=snyk&logoWidth=20)](https://img.shields.io/snyk/vulnerabilities/github/ShaneLucy/project-boilerplate-setup?logo=snyk&logoWidth=20) [![Code Size](https://img.shields.io/github/languages/code-size/ShaneLucy/project-boilerplate-setup?logo=github&logoWidth=20)](https://img.shields.io/github/languages/code-size/ShaneLucy/project-boilerplate-setup?logo=github&logoWidth=20) [![Repo Size](https://img.shields.io/github/repo-size/ShaneLucy/project-boilerplate-setup?logo=github&logoWidth=20)](https://img.shields.io/github/repo-size/ShaneLucy/project-boilerplate-setup?logo=github&logoWidth=20) [![Issues](https://img.shields.io/github/issues-raw/ShaneLucy/project-boilerplate-setup?logo=github&logoWidth=20)](https://img.shields.io/github/issues-raw/ShaneLucy/project-boilerplate-setup?logo=github&logoWidth=20) [![Last Commit](https://img.shields.io/github/last-commit/ShaneLucy/project-boilerplate-setup?logo=github&logoWidth=20)](https://img.shields.io/github/last-commit/ShaneLucy/project-boilerplate-setup?logo=github&logoWidth=20) [![Test Coverage](https://img.shields.io/coveralls/github/ShaneLucy/project-boilerplate-setup?logo=coveralls&logoWidth=20)](https://img.shields.io/coveralls/github/ShaneLucy/project-boilerplate-setup?logo=coveralls&logoWidth=20) [![Sonar Cloud Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=ShaneLucy_project-boilerplate-setup&metric=alert_status)](https://sonarcloud.io/api/project_badges/measure?project=ShaneLucy_project-boilerplate-setup&metric=alert_status)

# Project Boilerplate Setup

A package to automate the boring bits when setting up a new project

## Description

### This project will:

1. Initialise git if it hasn't already been initialised
2. Try to parse a package.json and determine the setup from this
3. If a package.json can't be found or this program encounters an error while trying to parse it, it will default to configuring a typescript project
   > Currently the only framework supported is Svelte
4. Install Eslint

   > Currently the only eslint configurations this will install are:
   >
   > - https://www.npmjs.com/package/eslint-config-typescript-airbnb-prettier
   > - https://www.npmjs.com/package/eslint-config-typescript-airbnb-prettier-svelte

   1. Create a configured `.eslintrc.js`

5. Install Prettier
   1. Create a configured `.prettierrc`
6. Add a lint & lint fix script to the package.json
7. Install husky
   1. Create a pre-commit hook to run linting
   2. Create a pre-push hook to run tests
8. Install Jest
   1. Create a configured `jest.config.js`
   2. Add linting support for Jest
   3. Add a test & coverage command to the package.json
   4. Create a src/tests/unit directory
   5. Create a src/tests/integration directory
9. Create ignore files
   1. `.eslintignore`
   2. `.gitignore`
   3. `.prettierignore`
10. Create Github Actions:
    1. Build
    2. Code Coverage
    3. Lint
    4. Test
11. Create project shields:
    > If a git remote is detected owner and repository placeholders will be replaced with respective values
    1. "https://img.shields.io/codeclimate/issues/\<OWNER>/\<REPOSITORY>?logo=codeclimate&logoWidth=20"
    2. "https://img.shields.io/codeclimate/tech-debt/\<OWNER>/\<REPOSITORY>?logo=codeclimate&logoWidth=20"
    3. "https://img.shields.io/codefactor/grade/github/\<OWNER>/\<REPOSITORY>/master?logo=codefactor&logoWidth=20"
    4. "https://img.shields.io/snyk/vulnerabilities/github/\<OWNER>/\<REPOSITORY>?logo=snyk&logoWidth=20"
    5. "https://img.shields.io/github/languages/code-size/\<OWNER>/\<REPOSITORY>?logo=github&logoWidth=20"
    6. "https://img.shields.io/github/repo-size/\<OWNER>/\<REPOSITORY>?logo=github&logoWidth=20"
    7. "https://img.shields.io/github/issues-raw/\<OWNER>/\<REPOSITORY>?logo=github&logoWidth=20"
    8. "https://img.shields.io/github/last-commit/\<OWNER>/\<REPOSITORY>?logo=github&logoWidth=20"
    9. "https://img.shields.io/coveralls/github/\<OWNER>/\<REPOSITORY>?logo=coveralls&logoWidth=20"
    10. "https://sonarcloud.io/api/project_badges/measure?project=\<OWNER>\_\<REPOSITORY>&metric=alert_status"
    11. Shields for each github action
12. Create a list of TODOs
    > These TODOs are generally additional setup which is required for the shields
13. Create a template README
14. Perform cleanup removing the setup directory

### If svelte has been detected in the package.json, this will also:

1. Install playwright
   1. Install playwright dependencies for Chromium, Firefox & Webkit
   2. Create a configured `playwright.config.ts`
   3. Add a test:e2e script to the package.json
   4. Add a test:e2e:headless script to the package.json
   5. Create a src/tests/e2e directory
2. Create a Github Action to run e2e tests
3. Install stylelint
   1. Create a configured `.stylelint.rc.json`
4. Add the following shields
   1. "https://img.shields.io/w3c-validation/default?targetUrl=WEBSITEURL"
   2. "https://img.shields.io/security-headers?url=WEBSITEURL"
   3. "https://img.shields.io/mozilla-observatory/grade-score/WEBSITEURL?logo=mozilla&logoWidth=20"
   4. "https://img.shields.io/uptimerobot/ratio/:monitorSpecificKey"
   5. "https://img.shields.io/uptimerobot/status/:monitorSpecificKey"

## Getting Started

### Dependencies

- Node v14 or greater
- Npm version 7 or greater
- Unix based system
- Have a node project initialised, e.g. `npm init`

### Executing program

Clone this repository into a directory named setup:

```
npx degit https://github.com/shanelucy/project-boilerplate-setup  setup --force
```

Go to setup

```
cd setup
```

Install dependencies

```
npm i
```

Go back to parent directory

```
cd ..
```

Run the setup script

```
npx ts-node setup/src/index.ts
```

- How to run the program
- Step-by-step bullets

```
code blocks for commands
```

## TODO

- When [TypeScript support](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#esm-nodejs) for ES Modules isn't behind an experimental flag compile and publish this package to the npm registry
- Create a prompt mode of this program which will let a user decide yes/no for each step & define any packages to be installed
