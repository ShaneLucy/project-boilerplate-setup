import { readFileSync } from "fs";
import logger from "./Logger";
import { Logger } from "../types";
import type { PackageJson } from "../types";

export const setPackageJson = (path: string): PackageJson => {
  try {
    const packageJson: PackageJson = JSON.parse(readFileSync(path).toString());
    logger(Logger.success, "package.json parsed");
    return packageJson;
  } catch (e) {
    logger(Logger.error, e);
    return {};
  }
};

export const setPackageJsonKeys = (packageJson: PackageJson): Array<string> =>
  Object.values(packageJson).flatMap((val) => Object.keys(val));

export const PACKAGE_JSON_KEYS = setPackageJsonKeys(setPackageJson("./package.json"));
