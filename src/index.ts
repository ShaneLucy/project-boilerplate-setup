import { existsSync } from "fs";
import { runSync, writeToFile, mkdir, cleanUp } from "./controllers/exec";
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
  JEST_FILE_CONTENTS,
  PLAYWRIGHT_FILE_CONTENTS,
  EXAMPLE_JEST_TEST,
  EXAMPLE_PLAYWRIGHT_TEST,
} from "./globals";
import { configureEslint } from "./controllers/eslint";
import { FRAMEWORK } from "./controllers/framework";
import { PROJECT_SHIELDS } from "./controllers/shields";
import { PROJECT_TODOS } from "./controllers/todos";

import testConfig from "./controllers/tests";
import { GithubActions, Hooks } from "./types";

const initialiseGit = (): void => {
  if (!existsSync(".git")) {
    runSync("git init");
  }
  writeToFile(".gitignore", GITIGNORE_CONTENT);
};

const configureGithubActions = (githubActions: Array<GithubActions>, framework: string): void => {
  mkdir("/.github/workflows");
  githubActions.forEach((action) => {
    if (action.name === "end-to-end-tests") {
      if (framework.length > 0) {
        writeToFile(`.github/workflows/${action.name}.yml`, action.action);
      }
    } else {
      writeToFile(`.github/workflows/${action.name}.yml`, action.action);
    }
  });
};

const configureStylelint = (styleLintFileContents: string): void => {
  writeToFile(".stylelintrc.json", styleLintFileContents);
  runSync(`npm i -D stylelint`);
  runSync(`npm i -D stylelint-config-standard`);
};

const configureLinting = (
  lintScript: string,
  lintScriptFix: string,
  framework: string,
  styleLintFileContents: string
): void => {
  let [lint, lintFix] = [lintScript, lintScriptFix];
  configureEslint();
  if (framework.length > 0) {
    configureStylelint(styleLintFileContents);
    lint = lintScript.concat(" && stylelint **/*.css");
    lintFix = lintScriptFix.concat(" && stylelint **/*.css --fix");
  }

  runSync(`npm set-script lint '${lint}'`);
  runSync(`npm set-script lint-fix '${lintFix}'`);
};

const configureGitHooks = (hooks: Array<Hooks>, framework: string): void => {
  runSync("npm i -D husky");
  runSync("npx husky install");

  hooks.forEach((hook, index) => {
    let configuredAction = hook.action;
    if (hook.name === "pre-push") {
      configuredAction = framework.length === 0 ? "npm run test" : "npm run test:pre-push";
    }
    runSync(`npx husky add .husky/${hooks[index].name} "${configuredAction}"`);
  });
};

const configurePrettier = (prettierFileContent: string, prettierIgnoreContent: string): void => {
  writeToFile(".prettierrc", prettierFileContent);
  writeToFile(".prettierignore", prettierIgnoreContent);
};

const configureReadme = (
  projectShields: Array<string>,
  projectTodos: Array<string>,
  readmeContent: string
): void => {
  let readme = "";
  for (let index = 0; index < projectShields.length; index += 1) {
    readme = readme.concat(projectShields[index]);
  }

  readme = readme.concat(`\n\n# TODO\n${projectTodos}\n\n${readmeContent}`);
  writeToFile("README.md", readme);
};

const scaffoldProject = async (): Promise<void> => {
  initialiseGit();
  configureGithubActions(GITHUB_ACTIONS, FRAMEWORK);
  configureLinting(LINT_SCRIPT, LINT_FIX_SCRIPT, FRAMEWORK, STYLELINT_FILE_CONTENTS);
  configureGitHooks(HOOKS, FRAMEWORK);
  testConfig(
    JEST_FILE_CONTENTS,
    EXAMPLE_JEST_TEST,
    PLAYWRIGHT_FILE_CONTENTS,
    EXAMPLE_PLAYWRIGHT_TEST,
    FRAMEWORK
  );
  configurePrettier(PRETTIER_FILE_CONTENT, PRETTIER_IGNORE_CONTENT);
  configureReadme(PROJECT_SHIELDS, PROJECT_TODOS, README_CONTENT);
  cleanUp();
};

scaffoldProject();
