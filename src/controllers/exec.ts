import { exec, execSync } from "child_process";
import { writeFile, rm } from "fs/promises";
import { mkdirSync } from "fs";

import logger from "./logger";
import { Logger } from "../types";

export const run = (command: string): void => {
  logger(Logger.info, `Executing ${command}`);

  exec(`${command}`, (error, stdout) => {
    if (error?.message) {
      logger(Logger.error, error.message);
      return;
    }

    logger(Logger.success, `${command} succeeded`);
    logger(Logger.info, stdout);
  });
};

export const runSync = (command: string): string | Error => {
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
};

export const writeToFile = async (file: string, content: string): Promise<void> => {
  logger(Logger.info, `Creating ${file}`);
  try {
    await writeFile(file, content);
    logger(Logger.success, `${file} configured`);
  } catch (error) {
    logger(Logger.error, error);
  }
};

export const mkdir = (path: string): void => {
  logger(Logger.info, `Creating Directory ${path}`);
  try {
    mkdirSync(`${process.cwd()}${path}`, { recursive: true });
    logger(Logger.success, `${path} created`);
  } catch (error) {
    logger(Logger.error, error);
  }
};

export const rmRf = async () => {
  logger(Logger.info, "Performing cleanup");
  try {
    await rm(`${process.cwd()}/setup`, { recursive: true, force: true });
    logger(Logger.success, "Project Configured\n Setup files sucessfully removed");
  } catch (error) {
    logger(Logger.success, "Project Configured");
    logger(Logger.error, `Unable to remove setup files\n ${error}`);
  }
};
