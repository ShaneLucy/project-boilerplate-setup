/**
 * TODO:
 * If project is frontend
 * - install playwright
 * - add linting for eslint
 * - add command for running tests
 */
import { run, writeToFile } from "./exec";
import { JEST_FILE_CONTENTS } from "../globals";

export default (): void => {
  run("npm i -D jest");
  run("npm i -D ts-jest");
  run("npm i -D eslint-plugin-jest");
  writeToFile("jest.config.js", JEST_FILE_CONTENTS);
  run("npm set-script test 'jest'");
  run("npm set-script coverage 'jest --coverage'");
};
