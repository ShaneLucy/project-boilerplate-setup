import { FRAMEWORK_OPTIONS, ESLINT_OPTIONS, KEYS } from "../globals";

export default class Project {
  static ESLINT = KEYS.find((element) => ESLINT_OPTIONS.includes(element));

  static FRAMEWORK = KEYS.find((element) => FRAMEWORK_OPTIONS.includes(element));

  static LANGUAGE = KEYS.find((element) => element === "typescript") ? "typescript" : "javascript";
}
