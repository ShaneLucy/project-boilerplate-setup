import { setPackageJson, setPackageJsonKeys } from "../../controllers/package-json";

describe("testing package.json methods", () => {
  test("if the package.json is invalid an empty object is returned", () => {
    expect(setPackageJson("./src/tests/mock-data/invalid-package.json")).toEqual({});
  });

  test("if the package.json is valid the correct number of top level keys are returned", () => {
    const TOTAL_TOP_LEVEL_KEYS_IN_SUPPLIED_PACKAGE_JSON = 5;
    expect(Object.keys(setPackageJson("./src/tests/mock-data/valid-package.json"))).toHaveLength(
      TOTAL_TOP_LEVEL_KEYS_IN_SUPPLIED_PACKAGE_JSON
    );
  });

  test("the correct number of packages are discovered in a package.json", () => {
    const TOTAL_KEYS_IN_SUPPLIED_PACKAGE_JSON = 35;
    expect(
      setPackageJsonKeys(setPackageJson("./src/tests/mock-data/valid-package.json"))
    ).toHaveLength(TOTAL_KEYS_IN_SUPPLIED_PACKAGE_JSON);
  });
});
