import Logger from "./Logger";
import Exec from "./Exec";

export default (): Array<string> | Array<boolean> => {
  try {
    const REMOTE_URL = Exec.runSync("git config --get remote.origin.url").toString();
    let response: Array<string> = [];

    if (typeof REMOTE_URL === typeof "") {
      const WORDS = REMOTE_URL.split(":");
      response = [WORDS[1].split("/")[0], WORDS[1].split("/")[1].split(".")[0]];
    }

    return response;
  } catch (e) {
    Logger.error(e);
    return [false, false];
  }
};
