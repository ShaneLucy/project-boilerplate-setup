import { setFramework } from "../../controllers/framework";

describe("testing that the correct framework is determined from package.json", () => {
  test("correct framework is returned as svelte", () => {
    const PACKAGE_JSON_KEYS = ["svelte", "typescript", "lodash", "someotheramazingpackage", "etc"];
    expect(setFramework(PACKAGE_JSON_KEYS)).toBe("svelte");
  });

  test("no framework is returned is package.json does'nt contain react, vue or svelte", () => {
    const PACKAGE_JSON_KEYS = ["typescript", "lodash", "someotheramazingpackage", "etc"];
    expect(setFramework(PACKAGE_JSON_KEYS)).toBe("");
  });
});
