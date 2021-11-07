import { existsSync } from "fs";
import Exec from "./controllers/Exec";
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
import { SHIELDS } from "./controllers/shields";
import PROJECT_TODOS from "./controllers/todos";

const initialiseGit = (): void => {
  if (!existsSync(".git")) {
    Exec.runSync("git init");
  }
};

const configureGithubActions = (): void => {
  Exec.mkdir("/.github/workflows");
  GITHUB_ACTIONS.forEach((action) => {
    Exec.writeFile(`.github/workflows/${action.name}.yml`, action.action);
  });
};

const configureEslint = (): void => {
  Exec.writeFile(".eslintrc.js", setEslintFileContents(ESLINT));
  Exec.writeFile(".eslintignore", ESLINT_IGNORE_CONTENT);
  Exec.run(`npm i -D ${ESLINT}`);
  Exec.run("npm set-script lint 'prettier --write . && eslint src/**'");
  Exec.run("npm set-script lint-fix 'prettier --write . && eslint src/** --fix'");
};

const configureGitHooks = (): void => {
  Exec.runSync("npm i -D husky");
  Exec.runSync("npx husky install");

  HOOKS.forEach((hook) => {
    Exec.runSync(`npx husky add .husky/${hook.name} "${hook.action}"`);
  });
};

const configurePrettier = (): void => {
  Exec.writeFile(".prettierrc", PRETTIER_FILE_CONTENT);
  Exec.writeFile(".prettierignore", PRETTIER_IGNORE_CONTENT);
};

const configureReadme = (): void => {
  let readme: string = "";
  for (let index = 0; index < SHIELDS.length; index += 1) {
    readme = readme.concat(SHIELDS[index]);
  }

  readme = readme.concat(`\n\n# TODO\n${PROJECT_TODOS}\n\n${README_CONTENT}`);
  Exec.writeFile("README.md", readme);
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
