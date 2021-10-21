import { exec } from "child_process";

import Project from "./controllers/Project";
import Logger from "./controllers/Logger";

console.log(Project.ESLINT);
console.log(Project.LANGUAGE);
console.log(Project.FRAMEWORK);

const installEslint = () => {
  Logger.info(`Installing ${Project.ESLINT}`);

  exec(`npm i -D ${Project.ESLINT}`, (error, stdout) => {
    if (error) {
      Logger.error(error);
      return;
    }
    Logger.success("Eslint installed & configured");
    console.log(stdout);
  });
};

installEslint();
