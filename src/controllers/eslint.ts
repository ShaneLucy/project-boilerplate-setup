import Logger from "./Logger";
import { FRAMEWORK } from "./framework";
import { ESLINT_OPTIONS, FRAMEWORK_OPTIONS } from "../globals";

export const setEslint = (): string => {
  let eslint;
  if (FRAMEWORK === undefined) {
    eslint = ESLINT_OPTIONS.find(
      (element) =>
        element.includes("typescript") && !FRAMEWORK_OPTIONS.find((el) => element.includes(el))
    );
  }

  if (typeof FRAMEWORK === typeof "") {
    eslint = ESLINT_OPTIONS.find((element) => element.includes(FRAMEWORK));
  }

  if (eslint === undefined) {
    Logger.error("Couldn't determine which eslint package to use");
    eslint = "";
  }

  return eslint;
};

export const eslintFileContents = (eslint: string): string =>
  `module.exports = {
    extends: "${eslint.split("eslint-config-")[1]}",
  };\n`;

export const ESLINT = setEslint();
