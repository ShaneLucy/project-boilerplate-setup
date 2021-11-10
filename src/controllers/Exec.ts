import { exec, execSync } from "child_process";
import { writeFile, rm } from "fs/promises";
import { mkdirSync } from "fs";

import logger from "./Logger";
import { Logger } from "../types";

export default class Exec {
  static run(command: string) {
    logger(Logger.info, `Executing ${command}`);

    exec(`${command}`, (error, stdout) => {
      if (error?.message) {
        logger(Logger.error, error.message);
        return;
      }

      logger(Logger.success, `${command} succeeded`);
      logger(Logger.info, stdout);
    });
  }

  static runSync(command: string): string | Error {
    logger(Logger.info, `Executing ${command}`);

    return (() => {
      try {
        const resp = execSync(`${command}`);
        logger(Logger.info, resp);
        return resp.toString();
      } catch (e) {
        logger(Logger.error, e);
        return e as Error;
      }
    })();
  }

  static async writeFile(file: string, content: string) {
    logger(Logger.info, `Creating ${file}`);
    try {
      await writeFile(file, content);
      logger(Logger.success, `${file} configured`);
    } catch (error) {
      logger(Logger.error, error);
    }
  }

  static mkdir(path: string) {
    logger(Logger.info, `Creating Directory ${path}`);
    try {
      mkdirSync(`${process.cwd()}${path}`, { recursive: true });
      logger(Logger.success, `${path} created`);
    } catch (error) {
      logger(Logger.error, error);
    }
  }

  static async rmRf() {
    logger(Logger.info, "Performing cleanup");
    try {
      await rm(`${process.cwd()}/setup`, { recursive: true, force: true });
      logger(Logger.success, "Project Configured\n Setup files sucessfully removed");
    } catch (error) {
      logger(Logger.success, "Project Configured");
      logger(Logger.error, `Unable to remove setup files\n ${error}`);
    }
  }
}
