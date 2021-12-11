import { FRAMEWORK } from "./framework";
import { writeToFile, run } from "./exec";
import { ESLINT_OPTIONS, FRAMEWORK_OPTIONS, ESLINT_IGNORE_CONTENT } from "../globals";

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
    eslint = "eslint-config-typescript-airbnb-prettier";
  }

  return eslint;
};

export const setEslintFileContents = (eslint: string): string => `module.exports = {
  extends: ["${eslint.split("eslint-config-")[1]}","plugin:jest/recommended","plugin:jest/style"],
};\n`;

export const configureEslint = (): void => {
  const ESLINT = setEslint({
    framework: FRAMEWORK,
    frameworkOptions: FRAMEWORK_OPTIONS,
    eslintOptions: ESLINT_OPTIONS,
  });

  writeToFile(".eslintrc.js", setEslintFileContents(ESLINT));
  writeToFile(".eslintignore", ESLINT_IGNORE_CONTENT);
  run(`npm i -D ${ESLINT}`);
};
