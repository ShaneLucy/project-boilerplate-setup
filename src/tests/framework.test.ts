import { setFramework } from "../controllers/framework";

describe("testing a svelte project is configured correctly", () => {
  test("correct framework is returned as svelte", () => {
    const PACKAGE_JSON_KEYS = ["svelte", "typescript", "lodash", "someotheramazingpackage", "etc"];
    expect(setFramework(PACKAGE_JSON_KEYS)).toEqual("svelte");
  });

  test("no framework is returned is package.json does'nt contain react, vue or svelte", () => {
    const PACKAGE_JSON_KEYS = ["typescript", "lodash", "someotheramazingpackage", "etc"];
    expect(setFramework(PACKAGE_JSON_KEYS)).toEqual("");
  });
});
