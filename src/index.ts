import Exec from "./controllers/Exec";
import { HOOKS, PRETTIER_FILE_CONTENT, eslintFileContents, ESLINT } from "./globals";

const configureEslint = (): void => {
  if (ESLINT === undefined) {
    throw new TypeError("Couldn't determine which eslint package to install");
  }

  Exec.writeFile(".eslintrc.js", eslintFileContents(ESLINT));
  Exec.run(`npm i -D ${ESLINT}`);
  Exec.run("npm set-script lint 'prettier --write . && eslint src/**'");
  Exec.run("npm set-script lint-fix 'prettier --write . && eslint src/** --fix'");
};

const configureGitHooks = (): void => {
  Exec.runSync("npm i -D husky");
  Exec.runSync("npx husky install");

  HOOKS.forEach((hook) => {
    Exec.runSync(`npx husky add .husky/${hook.name} "${hook.action}"`);
    Exec.runSync(`git add .husky/${hook.name}`);
  });
};

const configurePrettier = async (): Promise<void> => {
  Exec.writeFile(".prettierrc", PRETTIER_FILE_CONTENT);
};

const scaffoldProject = (): void => {
  configureEslint();
  configureGitHooks();
  configurePrettier();
};

scaffoldProject();
