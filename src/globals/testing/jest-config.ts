const JEST_FILE_CONTENTS = `/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/unit/**/*.[jt]s?(x)", "**/tests/integration/**/*.[jt]s?(x)"],
};\n`;

export default JEST_FILE_CONTENTS;
