import { readFileSync } from "fs";

import Logger from "./controllers/Logger";
import type { PackageJson } from "./types";

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

export const ESLINT_OPTIONS = [
  "eslint-config-typescript-airbnb-prettier-svelte",
  "eslint-config-typescript-airbnb-prettier",
  "eslint-config-airbnb-prettier-import",
];
export const KEYS = Object.values(PACKAGE_JSON).flatMap((val) => Object.keys(val));
export const FRAMEWORK_OPTIONS = ["svelte", "react", "vue"];
