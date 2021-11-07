import { exec, execSync } from "child_process";
import { writeFile } from "fs/promises";
import { mkdirSync } from "fs";

import Logger from "./Logger";

export default class Exec {
  static run(command: string) {
    Logger.info(`Executing ${command}`);

    exec(`${command}`, (error, stdout) => {
      if (error?.message) {
        Logger.error(error.message);
        return;
      }

      Logger.success(`${command} succeeded`);
      Logger.info(stdout);
    });
  }

  static runSync(command: string): string | Error {
    Logger.info(`Executing ${command}`);

    return (() => {
      try {
        const resp = execSync(`${command}`);
        Logger.info(resp);
        return resp.toString();
      } catch (e) {
        Logger.error(e);
        return e as Error;
      }
    })();
  }

  static async writeFile(file: string, content: string) {
    Logger.info(`Creating ${file}`);
    try {
      await writeFile(file, content);
      Logger.success(`${file} configured`);
    } catch (error) {
      Logger.error(error);
    }
  }

  static mkdir(path: string) {
    Logger.info(`Creating Directory ${path}`);
    try {
      mkdirSync(`${process.cwd()}${path}`, { recursive: true });
      Logger.success(`${path} created`);
    } catch (error) {
      Logger.error(error);
    }
  }
}
