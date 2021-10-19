import { readFileSync } from "fs";

/**
 * Console colours
 */
const SUCCESS = "\x1b[32m%s\x1b[0m";
const ERROR = "\x1b[31m%s\x1b[0m";

let packageJson;
try {
  packageJson = JSON.parse(readFileSync("./package.json"));
  console.log(SUCCESS, "package.json read");
} catch {
  console.error(ERROR, "Couldn't find a package.json");
}

const projectType = () => {
  let type;
  for (const key in packageJson.devDependencies) {
    if (key === "svelte") {
      type = key;
      break;
    }
  }

  if (type === undefined) {
    console.error(ERROR, "Couldn't determine project type");
  } else {
    console.log(SUCCESS, `${type} project detected`);
  }
  return type;
};

projectType();
