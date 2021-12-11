import BUILD from "./build";
import COVERAGE from "./coverage";
import LINT from "./lint";
import E2E_TESTS from "./e2e-tests";
import TEST from "./test";

import type { GithubActions } from "../../types";

const GITHUB_ACTIONS: Array<GithubActions> = [
  {
    name: "Lint",
    action: LINT,
  },
  {
    name: "Build",
    action: BUILD,
  },
  {
    name: "Coverage",
    action: COVERAGE,
  },
  {
    name: "End-to-End Tests",
    action: E2E_TESTS,
  },
  {
    name: "Test",
    action: TEST,
  },
];

export default GITHUB_ACTIONS;
