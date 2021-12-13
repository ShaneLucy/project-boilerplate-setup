const EXAMPLE_PLAYWRIGHT_TEST = `import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  const title = page.locator(".navbar__inner .navbar__title");
  await expect(title).toHaveText("Playwright");
});
`;

export default EXAMPLE_PLAYWRIGHT_TEST;
