import Logger from "./Logger";
import { FRAMEWORK } from "./framework";
import { ESLINT_OPTIONS, FRAMEWORK_OPTIONS } from "../globals";

interface Args {
  framework: string;
  frameworkOptions: Array<string>;
  eslintOptions: Array<string>;
}

export const setEslint = (args: Args): string => {
  let eslint;

  if (args.framework.length === 0) {
    eslint = ESLINT_OPTIONS.find(
      (element) => !FRAMEWORK_OPTIONS.find((el) => element.includes(el))
    );
  } else {
    eslint = args.eslintOptions.find((element) => element.includes(args.framework));
  }

  if (eslint === undefined) {
    Logger.error("Couldn't determine which eslint package to use");
    eslint = "eslint-config-typescript-airbnb-prettier";
  }

  return eslint;
};

export const ESLINT = setEslint({
  framework: FRAMEWORK,
  frameworkOptions: FRAMEWORK_OPTIONS,
  eslintOptions: ESLINT_OPTIONS,
});
