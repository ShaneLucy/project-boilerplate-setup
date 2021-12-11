import { exec, execSync } from "child_process";
import { writeFile, rm } from "fs/promises";
import { mkdirSync } from "fs";

import { logger } from "./logger";

export const run = (command: string): void => {
  logger("INFO", `Executing ${command}`);

  exec(`${command}`, (error) => {
    if (error?.message) {
      logger("ERROR", `${command} failed`);
      logger("ERROR", error.message);
      return;
    }

    logger("SUCCESS", `${command} succeeded`);
  });
};

export const runSync = (command: string): string | Error => {
  logger("INFO", `Executing ${command}`);

  return (() => {
    try {
      const resp = execSync(`${command}`);
      logger("SUCCESS", `${command} succeeded`);
      return resp.toString();
    } catch (e) {
      logger("ERROR", `${command} failed`);
      logger("ERROR", e);
      return e as Error;
    }
  })();
};

export const writeToFile = async (file: string, content: string): Promise<void> => {
  logger("INFO", `Creating ${file}`);
  try {
    await writeFile(file, content);
    logger("SUCCESS", `${file} configured`);
  } catch (error) {
    logger("ERROR", error);
  }
};

export const mkdir = (path: string): void => {
  logger("INFO", `Creating Directory ${path}`);
  try {
    mkdirSync(`${process.cwd()}${path}`, { recursive: true });
    logger("SUCCESS", `${path} created`);
  } catch (error) {
    logger("SUCCESS", error);
  }
};

export const cleanUp = async () => {
  logger("INFO", "Performing cleanup");
  try {
    await rm(`${process.cwd()}/setup`, { recursive: true, force: true });
    logger("SUCCESS", "Project Configured & Setup files sucessfully removed");
  } catch (error) {
    logger("ERROR", `Unable to remove setup files\n ${error}`);
  }
};
