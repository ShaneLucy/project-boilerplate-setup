import logger from "./logger";
import { Logger } from "../types";
import { runSync } from "./exec";

const getRemote = (): string => runSync("git config --get remote.origin.url").toString();

export const setRemote = (url: string): Array<string> => {
  try {
    let response: Array<string> = [];

    if (typeof url === typeof "") {
      const WORDS = url.split(":");
      response = [WORDS[1].split("/")[0], WORDS[1].split("/")[1].split(".")[0]];
    }

    return response;
  } catch (e) {
    logger(Logger.error, e);
    return ["<OWNER>", "<REPOSITORY>"];
  }
};

export const [OWNER, REPOSITORY] = setRemote(getRemote());
