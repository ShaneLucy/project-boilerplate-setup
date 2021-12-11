import { existsSync } from "fs";
import { runSync, writeToFile, mkdir, run, cleanUp } from "./controllers/exec";
import {
  HOOKS,
  PRETTIER_FILE_CONTENT,
  PRETTIER_IGNORE_CONTENT,
  GITHUB_ACTIONS,
  README_CONTENT,
  STYLELINT_FILE_CONTENTS,
  LINT_SCRIPT,
  LINT_FIX_SCRIPT,
  GITIGNORE_CONTENT,
} from "./globals";
import { configureEslint } from "./controllers/eslint";
import { FRAMEWORK } from "./controllers/framework";
import { PROJECT_SHIELDS } from "./controllers/shields";
import { PROJECT_TODOS } from "./controllers/todos";

import testConfig from "./controllers/tests";

const initialiseGit = (): void => {
  if (!existsSync(".git")) {
    runSync("git init");
  }
  writeToFile(".gitignore", GITIGNORE_CONTENT);
};

const configureGithubActions = (): void => {
  mkdir("/.github/workflows");
  GITHUB_ACTIONS.forEach((action) => {
    if (action.name === "end-to-end-tests") {
      if (FRAMEWORK.length > 0) {
        writeToFile(`.github/workflows/${action.name}.yml`, action.action);
      }
    } else {
      writeToFile(`.github/workflows/${action.name}.yml`, action.action);
    }
  });
};

const configureStylelint = (): void => {
  writeToFile(".stylelintrc.json", STYLELINT_FILE_CONTENTS);
  run(`npm i -D stylelint`);
  run(`npm i -D stylelint-config-standard`);
};

const configureLinting = (): void => {
  let [lintScript, lintScriptFix] = [LINT_SCRIPT, LINT_FIX_SCRIPT];
  configureEslint();
  if (FRAMEWORK.length > 0) {
    configureStylelint();
    lintScript = LINT_SCRIPT.concat(" && stylelint **/*.css");
    lintScriptFix = LINT_SCRIPT.concat(" && stylelint **/*.css --fix");
  }

  run(`npm set-script lint '${lintScript}'`);
  run(`npm set-script lint-fix '${lintScriptFix}'`);
};

const configureGitHooks = (): void => {
  runSync("npm i -D husky");
  runSync("npx husky install");

  HOOKS.forEach((hook, index) => {
    if (hook.name === "pre-push") {
      HOOKS[index].action = FRAMEWORK.length === 0 ? "npm run test" : "npm run test:pre-push";
    }
    runSync(`npx husky add .husky/${HOOKS[index].name} "${HOOKS[index].action}"`);
  });
};

const configurePrettier = (): void => {
  writeToFile(".prettierrc", PRETTIER_FILE_CONTENT);
  writeToFile(".prettierignore", PRETTIER_IGNORE_CONTENT);
};

const configureReadme = (): void => {
  let readme = "";
  for (let index = 0; index < PROJECT_SHIELDS.length; index += 1) {
    readme = readme.concat(PROJECT_SHIELDS[index]);
  }

  readme = readme.concat(`\n\n# TODO\n${PROJECT_TODOS}\n\n${README_CONTENT}`);
  writeToFile("README.md", readme);
};

const scaffoldProject = async (): Promise<void> => {
  initialiseGit();
  configureGithubActions();
  configureLinting();
  configureGitHooks();
  testConfig();
  configurePrettier();
  configureReadme();
  cleanUp();
};

scaffoldProject();
