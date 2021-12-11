import type { Shield } from "../../types";

const SHARED_SHIELDS: Array<Shield> = [
  {
    name: "Code Issues",
    url:
      "https://img.shields.io/codeclimate/issues/<OWNER>/<REPOSITORY>?logo=codeclimate&logoWidth=20",
  },
  {
    name: "Tech Debt",
    url:
      "https://img.shields.io/codeclimate/tech-debt/<OWNER>/<REPOSITORY>?logo=codeclimate&logoWidth=20",
  },
  {
    name: "Code Quality",
    url:
      "https://img.shields.io/codefactor/grade/github/<OWNER>/<REPOSITORY>/master?logo=codefactor&logoWidth=20",
  },
  {
    name: "Vulnerabilities",
    url:
      "https://img.shields.io/snyk/vulnerabilities/github/<OWNER>/<REPOSITORY>?logo=snyk&logoWidth=20",
  },
  {
    name: "Code Size",
    url:
      "https://img.shields.io/github/languages/code-size/<OWNER>/<REPOSITORY>?logo=github&logoWidth=20",
  },
  {
    name: "Repo Size",
    url: "https://img.shields.io/github/repo-size/<OWNER>/<REPOSITORY>?logo=github&logoWidth=20",
  },
  {
    name: "Issues",
    url: "https://img.shields.io/github/issues-raw/<OWNER>/<REPOSITORY>?logo=github&logoWidth=20",
  },
  {
    name: "Last Commit",
    url: "https://img.shields.io/github/last-commit/<OWNER>/<REPOSITORY>?logo=github&logoWidth=20",
  },
  {
    name: "Test Coverage",
    url: "https://img.shields.io/coveralls/github/<OWNER>/<REPOSITORY>?logo=coveralls&logoWidth=20",
  },
  {
    name: "Sonar Cloud Quality Gate",
    url:
      "https://sonarcloud.io/api/project_badges/measure?project=<OWNER>_<REPOSITORY>&metric=alert_status",
  },
];
export default SHARED_SHIELDS;
