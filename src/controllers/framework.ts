import { PACKAGE_JSON_KEYS } from "./package-json";
import { FRAMEWORK_OPTIONS } from "../globals";

export const setFramework = (keys: Array<string>): string => {
  let framework = keys.find((element) => FRAMEWORK_OPTIONS.includes(element));
  if (framework === undefined) {
    framework = "";
  }
  return framework;
};

export const FRAMEWORK = setFramework(PACKAGE_JSON_KEYS);
