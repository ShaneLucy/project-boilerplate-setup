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

export const [OWNER, REPO] = ((): Array<string> => {
  const REMOTE_URL = Exec.runSync("git config --get remote.origin.url").toString();
  let response: Array<string> = [];

  if (typeof REMOTE_URL === typeof "") {
    const WORDS = REMOTE_URL.split(":");
    response = [WORDS[1].split("/")[0], WORDS[1].split("/")[1].split(".")[0]];
  }

  return response;
})();

export const ESLINT_OPTIONS = [
  "eslint-config-typescript-airbnb-prettier-svelte",
  "eslint-config-typescript-airbnb-prettier",
  "eslint-config-airbnb-prettier-import",
];

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
export const KEYS = Object.values(PACKAGE_JSON).flatMap((val) => Object.keys(val));
export const FRAMEWORK_OPTIONS = ["svelte", "react", "vue"];
