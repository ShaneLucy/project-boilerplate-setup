import { exec } from "child_process";

// import { constants } from "fs";
// import { copyFile } from "fs/promises";

import { SUCCESS, ERROR } from "./globals.mjs";
import projectType from "./project-type.mjs";
import setEslintConfig from "./eslint-config.mjs";

const PROJECT_TYPE = projectType();
const ESLINT_PACKAGE = setEslintConfig(PROJECT_TYPE);

/**
 * Install eslint
 */
const installEslint = () => {
  console.log(`Installing ${ESLINT_PACKAGE}`);

  exec(`npm i -D ${ESLINT_PACKAGE}`, (error, stdout) => {
    if (error) {
      console.error(ERROR, error);
      return;
    }
    console.log(SUCCESS, "Installed eslint");
    console.log(stdout);
  });
};

installEslint();

// /**
//  * for each file in the correct directory run copy
//  */
// try {
//   await copyFile("source.txt", "destination.txt");
//   console.log("source.txt was copied to destination.txt");
// } catch {
//   console.log("The file could not be copied");
// }

// // By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
// try {
//   await copyFile("source.txt", "destination.txt", constants.COPYFILE_EXCL);
//   console.log("source.txt was copied to destination.txt");
// } catch {
//   console.log("The file could not be copied");
// }
