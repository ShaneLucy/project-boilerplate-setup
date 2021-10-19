/**
 * Determine which eslint package to install
 * @returns {string} eslint package name
 */
export default (packageJson) => {
  let eslint;
  switch (packageJson) {
    case "svelte":
      eslint = "eslint-config-typescript-airbnb-prettier-svelte";
      break;
    default:
      eslint = "eslint-config-typescript-airbnb-prettier";
  }
  return eslint;
};
