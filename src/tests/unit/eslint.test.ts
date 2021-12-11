import { setEslint, setEslintFileContents } from "../../controllers/eslint";

describe("testing correct eslint package is determined", () => {
  const FRAMEWORK_OPTIONS = ["svelte", "vue", "react"];
  const ESLINT_OPTIONS = [
    "eslint-config-typescript-airbnb-prettier-svelte",
    "eslint-config-typescript-airbnb-prettier",
  ];

  test("correct eslint package is set for the supplied framework", () => {
    const ESLINT = setEslint({
      framework: "svelte",
      frameworkOptions: FRAMEWORK_OPTIONS,
      eslintOptions: ESLINT_OPTIONS,
    });

    expect(ESLINT).toBe("eslint-config-typescript-airbnb-prettier-svelte");
  });

  test("correct eslint package is set when a config for the supplied framework doesn't exist", () => {
    const ESLINT = setEslint({
      framework: "angular",
      frameworkOptions: FRAMEWORK_OPTIONS,
      eslintOptions: ESLINT_OPTIONS,
    });

    expect(ESLINT).toBe("eslint-config-typescript-airbnb-prettier");
  });

  test("correct eslint package is set when not using a framework", () => {
    const ESLINT = setEslint({
      framework: "",
      frameworkOptions: FRAMEWORK_OPTIONS,
      eslintOptions: ESLINT_OPTIONS,
    });

    expect(ESLINT).toBe("eslint-config-typescript-airbnb-prettier");
  });

  test("defaults to base typescript config if framework options and eslint options are empty", () => {
    const ESLINT = setEslint({
      framework: "",
      frameworkOptions: [""],
      eslintOptions: [""],
    });

    expect(ESLINT).toBe("eslint-config-typescript-airbnb-prettier");
  });
});

describe("testing correct .eslintrc.js file contents are generated", () => {
  test(".eslintrc.js has the correct contents if a front end framework hasn't been detected", () => {
    const EXPECTED_OUTCOME = `module.exports = {
  extends: ["typescript-airbnb-prettier","plugin:jest/recommended","plugin:jest/style",""],
};\n`;

    expect(setEslintFileContents("eslint-config-typescript-airbnb-prettier")).toEqual(
      EXPECTED_OUTCOME
    );
  });
});
