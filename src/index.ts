import Project from "./controllers/Project";
import Exec from "./controllers/Exec";
import { HOOKS, PRETTIER_FILE_CONTENT, eslintFileContents } from "./globals";

const configureEslint = (): void => {
  if (Project.ESLINT === undefined) {
    throw new TypeError("Couldn't determine which eslint package to install");
  }

  Exec.writeFile(".eslintrc.js", eslintFileContents(Project.ESLINT));
  Exec.run(`npm i -D ${Project.ESLINT}`);
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
