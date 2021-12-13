import { run, writeToFile, mkdir } from "./exec";
import { FRAMEWORK } from "./framework";
import {
  JEST_FILE_CONTENTS,
  PLAYWRIGHT_FILE_CONTENTS,
  EXAMPLE_JEST_TEST,
  EXAMPLE_PLAYWRIGHT_TEST,
} from "../globals";

const configureJest = () => {
  mkdir("/src/tests/unit");
  mkdir("/src/tests/integration");
  run("npm i -D jest");
  run("npm i -D ts-jest");
  run("npm i -D eslint-plugin-jest");
  run("npm i --save-dev @types/jest");
  run("npm set-script test 'jest'");
  run("npm set-script coverage 'jest --coverage'");
  writeToFile("jest.config.js", JEST_FILE_CONTENTS);
  writeToFile("src/tests/unit/example.test.ts", EXAMPLE_JEST_TEST);
};

const configurePlaywright = () => {
  mkdir("/src/tests/e2e");
  run("npm i -D @playwright/test");
  run("npx playwright install");
  run("npm set-script test:e2e 'playwright test --reporter=html --headed'");
  run("npm set-script test:e2e:headless 'jest --coverage playwright test --reporter=html'");
  writeToFile("playwright.config.ts", PLAYWRIGHT_FILE_CONTENTS);
  writeToFile("src/tests/e2e/example.test.ts", EXAMPLE_PLAYWRIGHT_TEST);
};

export default (): void => {
  configureJest();
  if (FRAMEWORK.length > 0) {
    run("npm set-script test:pre-push 'npm run test && npm run test:e2e'");
    configurePlaywright();
  }
};
