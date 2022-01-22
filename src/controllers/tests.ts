import { runSync, writeToFile, mkdir } from "./exec";

const configureJest = (jestFileContents: string, exampleJestTest: string) => {
  mkdir("/src/tests/unit");
  mkdir("/src/tests/integration");
  runSync("npm i -D jest");
  runSync("npm i -D ts-jest");
  runSync("npm i -D eslint-plugin-jest");
  runSync("npm i --save-dev @types/jest");
  runSync("npm set-script test 'jest'");
  runSync("npm set-script coverage 'jest --coverage'");
  writeToFile("jest.config.js", jestFileContents);
  writeToFile("src/tests/unit/example.test.ts", exampleJestTest);
};

const configurePlaywright = (playwrightFileContents: string, examplePlaywrightTest: string) => {
  mkdir("/src/tests/e2e");
  runSync("npm i -D @playwright/test");
  runSync("npm i playwright");
  runSync("npm set-script test:e2e 'playwright test --reporter=html --headed'");
  runSync("npm set-script test:e2e:headless 'test --coverage playwright test --reporter=html'");
  writeToFile("playwright.config.ts", playwrightFileContents);
  writeToFile("src/tests/e2e/example.test.ts", examplePlaywrightTest);
};

export default (
  jestFileContents: string,
  exampleJestTest: string,
  playwrightFileContents: string,
  examplePlaywrightTest: string,
  framework: string
): void => {
  configureJest(jestFileContents, exampleJestTest);
  if (framework.length > 0) {
    runSync("npm set-script test:pre-push 'npm run test && npm run test:e2e'");
    configurePlaywright(playwrightFileContents, examplePlaywrightTest);
  }
};
