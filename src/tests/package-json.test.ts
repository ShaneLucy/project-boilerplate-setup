import { setPackageJson, setPackageJsonKeys } from "../controllers/package-json";

describe("testing package.json methods", () => {
  test("if the package.json is invalid an empty object is returned", () => {
    expect(setPackageJson("./src/tests/mock-data/invalid-package.json")).toEqual({});
  });

  test("if the package.json is valid the correct number of top level keys are returned ", () => {
    expect(Object.keys(setPackageJson("./src/tests/mock-data/valid-package.json")).length).toEqual(
      5
    );
  });

  test("the correct number of packages are discovered in a package.json", () => {
    expect(
      setPackageJsonKeys(setPackageJson("./src/tests/mock-data/valid-package.json")).length
    ).toEqual(35);
  });
});
