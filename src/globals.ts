import { readFileSync } from "fs";
import Logger from "./controllers/Logger";
import Exec from "./controllers/Exec";
import type { PackageJson, Hooks } from "./types";

const PACKAGE_JSON = (() => {
  try {
    const packageJson: PackageJson = JSON.parse(readFileSync("./package.json").toString());
    Logger.success("package.json parsed");
    return packageJson;
  } catch (e: any) {
    Logger.error(e);
    return {};
  }
})();

const setGit = (): Array<string> | Array<boolean> =>
  (() => {
    try {
      const REMOTE_URL = Exec.runSync("git config --get remote.origin.url").toString();
      let response: Array<string> = [];

      if (typeof REMOTE_URL === typeof "") {
        const WORDS = REMOTE_URL.split(":");
        response = [WORDS[1].split("/")[0], WORDS[1].split("/")[1].split(".")[0]];
      }

      return response;
    } catch (e) {
      Logger.error(e);
      return [false, false];
    }
  })();

export const [OWNER, REPOSITORY] = setGit();

export const ESLINT_OPTIONS = [
  "eslint-config-typescript-airbnb-prettier-svelte",
  "eslint-config-typescript-airbnb-prettier",
  "eslint-config-airbnb-prettier-import",
];
const FRAMEWORK_OPTIONS = ["svelte", "react", "vue"];

export const BASE_GITHUB_BADGE_URL = `https://github.com/<OWNER>/<REPOSITORY>/actions/workflows/<WORKFLOW_FILE>/badge.svg`;

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

const KEYS = Object.values(PACKAGE_JSON).flatMap((val) => Object.keys(val));

export const PRETTIER_FILE_CONTENT = `{
  "printWidth": 100
}\n`;

export const eslintFileContents = (eslint: string): string =>
  `module.exports = {
    extends: "${eslint.split("eslint-config-")[1]}",
  };\n`;

export const ESLINT_IGNORE_CONTENT = `
.eslintrc.js
node_modules/**
`;

export const PRETTIER_IGNORE_CONTENT = `
node_modules/**
`;

export const setFramework = (keys: Array<string>): string | undefined =>
  keys.find((element) => FRAMEWORK_OPTIONS.includes(element));

export const setLanguage = (keys: Array<string>): string =>
  keys.find((element) => element === "typescript") ? "typescript" : "javascript";

export const FRAMEWORK = setFramework(KEYS);
const LANGUAGE = setLanguage(KEYS);

const setEslint = (): string => {
  let eslint = "";
  if (FRAMEWORK === undefined) {
    const eslintLangConfig = ESLINT_OPTIONS.find(
      (element) =>
        element.includes(LANGUAGE) && !FRAMEWORK_OPTIONS.find((el) => element.includes(el))
    );

    if (eslintLangConfig) {
      eslint = eslintLangConfig;
    }
  } else {
    const eslintFrameworkConfig = ESLINT_OPTIONS.find((element) => element.includes(FRAMEWORK));
    if (eslintFrameworkConfig) {
      eslint = eslintFrameworkConfig;
    }
  }
  return eslint;
};

export const ESLINT = setEslint();
