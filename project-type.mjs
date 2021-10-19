import { readFileSync } from "fs";
import { SUCCESS, ERROR } from "./globals.mjs";

let packageJson;
try {
  packageJson = JSON.parse(readFileSync("./package.json"));
  console.log(SUCCESS, "package.json read");
} catch {
  console.error(ERROR, "Couldn't find a package.json");
}

/**
 * Determine the project type to scaffold
 * @returns {string} type
 */
export default () => {
  let type;
  for (const key in packageJson.devDependencies) {
    if (key === "svelte") {
      type = key;
      break;
    }
  }

  if (type === undefined) {
    console.error(ERROR, "Couldn't determine project type");
    console.log(SUCCESS, `Defaulting to base TypeScript`);
    type = "base";
  } else {
    console.log(SUCCESS, `${type} project detected`);
  }
  return type;
};
