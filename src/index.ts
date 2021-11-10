import { existsSync } from "fs";
import { runSync, writeToFile, mkdir, run, rmRf } from "./controllers/exec";
import {
  HOOKS,
  PRETTIER_FILE_CONTENT,
  PRETTIER_IGNORE_CONTENT,
  ESLINT_IGNORE_CONTENT,
  GITHUB_ACTIONS,
  setEslintFileContents,
  README_CONTENT,
} from "./globals";
import { ESLINT } from "./controllers/eslint";
import { PROJECT_SHIELDS } from "./controllers/shields";
import { PROJECT_TODOS } from "./controllers/todos";

const initialiseGit = (): void => {
  if (!existsSync(".git")) {
    runSync("git init");
  }
};

const configureGithubActions = (): void => {
  mkdir("/.github/workflows");
  GITHUB_ACTIONS.forEach((action) => {
    writeToFile(`.github/workflows/${action.name}.yml`, action.action);
  });
};

const configureEslint = (): void => {
  writeToFile(".eslintrc.js", setEslintFileContents(ESLINT));
  writeToFile(".eslintignore", ESLINT_IGNORE_CONTENT);
  run(`npm i -D ${ESLINT}`);
  run("npm set-script lint 'prettier --write . && eslint src/**'");
  run("npm set-script lint-fix 'prettier --write . && eslint src/** --fix'");
};

const configureGitHooks = (): void => {
  runSync("npm i -D husky");
  runSync("npx husky install");

  HOOKS.forEach((hook) => {
    runSync(`npx husky add .husky/${hook.name} "${hook.action}"`);
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

const cleanUp = (): void => {
  rmRf();
};

const scaffoldProject = (): void => {
  initialiseGit();
  configureGithubActions();
  configureEslint();
  configureGitHooks();
  configurePrettier();
  configureReadme();
};

scaffoldProject();
cleanUp();
