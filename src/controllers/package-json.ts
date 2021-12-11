import { readFileSync } from "fs";
import { logger } from "./logger";
import type { PackageJson } from "../types";

export const setPackageJson = (path: string): PackageJson => {
  try {
    const packageJson: PackageJson = JSON.parse(readFileSync(path).toString());
    logger("SUCCESS", "package.json parsed");
    return packageJson;
  } catch (e) {
    logger("ERROR", e);
    return {};
  }
};

export const setPackageJsonKeys = (packageJson: PackageJson): Array<string> =>
  Object.values(packageJson).flatMap((val) => Object.keys(val));

export const PACKAGE_JSON_KEYS = setPackageJsonKeys(setPackageJson("./package.json"));
