import BUILD from "./build";
import COVERAGE from "./coverage";
import LINT from "./lint";
import E2E_TESTS from "./e2e-tests";
import TEST from "./test";

import type { GithubActions } from "../../types";

const GITHUB_ACTIONS: Array<GithubActions> = [
  {
    name: "lint",
    action: LINT,
  },
  {
    name: "build",
    action: BUILD,
  },
  {
    name: "coverage",
    action: COVERAGE,
  },
  {
    name: "end-to-end-tests",
    action: E2E_TESTS,
  },
  {
    name: "test",
    action: TEST,
  },
];

export default GITHUB_ACTIONS;
