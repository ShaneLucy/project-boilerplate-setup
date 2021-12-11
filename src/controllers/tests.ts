import { run, runSync, writeToFile, mkdir } from "./exec";
import { FRAMEWORK } from "./framework";
import { JEST_FILE_CONTENTS, PLAYWRIGHT_FILE_CONTENTS } from "../globals";

const configureJest = () => {
  run("npm i -D jest");
  run("npm i -D ts-jest");
  run("npm i -D eslint-plugin-jest");
  writeToFile("jest.config.js", JEST_FILE_CONTENTS);
  run("npm set-script test 'jest'");
  run("npm set-script coverage 'jest --coverage'");
};

const configurePlaywright = () => {
  runSync("npm i -D @playwright/test");
  runSync("npx playwright install");
  writeToFile("playwright.config.ts", PLAYWRIGHT_FILE_CONTENTS);
  run("npm set-script test:e2e 'playwright test --reporter=html --headed'");
  run("npm set-script test:e2e:headless 'jest --coverage playwright test --reporter=html'");
};

export default (): void => {
  mkdir("/src/tests/unit");
  mkdir("/src/tests/integration");

  configureJest();
  if (FRAMEWORK.length > 0) {
    mkdir("/src/tests/e2e");
    run("npm set-script test:pre-push 'npm run test && npm run test:e2e'");
    configurePlaywright();
  }
};
