export enum Severity {
  INFO = "\x1b[37m%s\x1b[0m",
  SUCCESS = "\x1b[32m%s\x1b[0m",
  ERROR = "\x1b[31m%s\x1b[0m",
}

type LogLevelStrings = keyof typeof Severity;

export const logger = (key: LogLevelStrings, message: any) => {
  console.log(Severity[key], `[${key}]`, message);
};
