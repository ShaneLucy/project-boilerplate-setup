import { exec, execSync } from "child_process";
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

  static runSync(command: string) {
    Logger.info(`Executing ${command}`);

    try {
      const resp = execSync(`${command}`);
      Logger.info(resp);
    } catch (e) {
      Logger.error(e);
    }
  }
}
