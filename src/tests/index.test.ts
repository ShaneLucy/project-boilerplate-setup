import { setFramework, setLanguage } from "../globals";

describe("the correct language is determined", () => {
  const PACKAGE_JSON_TS = ["typescript", "svelte", "lodash", "someotheramazingpackage", "etc"];
  const PACKAGE_JSON_JS = ["eslint", "svelte", "lodash", "someotheramazingpackage", "etc"];

  test("a typescript project is correctly determined", () => {
    expect(setLanguage(PACKAGE_JSON_TS)).toEqual("typescript");
  });

  test("a javascript project is correctly determined", () => {
    expect(setLanguage(PACKAGE_JSON_JS)).toEqual("javascript");
  });
});

describe("testing a svelte project is configured correctly", () => {
  const PACKAGE_JSON_KEYS = ["svelte", "typescript", "lodash", "someotheramazingpackage", "etc"];

  test("correct framework is returned as svelte", () => {
    expect(setFramework(PACKAGE_JSON_KEYS)).toEqual("svelte");
  });
});
