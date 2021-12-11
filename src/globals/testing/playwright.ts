const PLAYWRIGHT_FILE_CONTENTS = `import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  testDir: 'tests/e2e',
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  expect: {
    toMatchSnapshot: { threshold: 0.1 },
  },
};
export default config;\n`;

export default PLAYWRIGHT_FILE_CONTENTS;
