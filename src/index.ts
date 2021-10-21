import Project from "./controllers/Project";
import Exec from "./controllers/Exec";
import { HOOKS } from "./globals";

const configureEslint = (): void => {
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

configureGitHooks();
configureEslint();
