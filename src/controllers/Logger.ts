export default class Logger {
  // NOSONAR this method should accept anything
  static info(message: any) {
    console.log("\x1b[37m%s\x1b[0m", message);
  }

  // NOSONAR this method should accept anything
  static success(message: any) {
    console.log("\x1b[32m%s\x1b[0m", message);
  }

  // NOSONAR this method should accept anything
  static error(message: any) {
    console.error("\x1b[31m%s\x1b[0m", message);
  }
}
