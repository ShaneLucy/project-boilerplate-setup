import { existsSync } from "fs";
import Exec from "./controllers/Exec";
import {
  HOOKS,
  PRETTIER_FILE_CONTENT,
  PRETTIER_IGNORE_CONTENT,
  ESLINT_IGNORE_CONTENT,
} from "./globals";
import { setEslintFileContents, ESLINT } from "./controllers/eslint";

const initialiseGit = (): void => {
  if (!existsSync(".git")) {
    Exec.runSync("git init");
  }
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

const configurePrettier = async (): Promise<void> => {
  Exec.writeFile(".prettierrc", PRETTIER_FILE_CONTENT);
  Exec.writeFile(".prettierignore", PRETTIER_IGNORE_CONTENT);
};

const scaffoldProject = (): void => {
  initialiseGit();
  configureEslint();
  configureGitHooks();
  configurePrettier();
};

scaffoldProject();
