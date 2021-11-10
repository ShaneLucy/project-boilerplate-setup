import type { Logger } from "../types";

export default (type: Logger, message: any) => {
  console.log(type, message);
};
