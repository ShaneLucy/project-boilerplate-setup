import type { Shield } from "../../types";

const FRONT_END_SHIELDS: Array<Shield> = [
  {
    name: "W3C Markup Validation score",
    url: "https://img.shields.io/w3c-validation/default?targetUrl=WEBSITEURL",
  },
  {
    name: "Security headers",
    url: "https://img.shields.io/security-headers?url=WEBSITEURL",
  },
  {
    name: "Mozilla Observatory Score",
    url:
      "https://img.shields.io/mozilla-observatory/grade-score/WEBSITEURL?logo=mozilla&logoWidth=20",
  },
  {
    name: "Uptime Percentage last 30 days",
    url: "https://img.shields.io/uptimerobot/ratio/:monitorSpecificKey",
  },
  {
    name: "Uptime status",
    url: "https://img.shields.io/uptimerobot/status/:monitorSpecificKey",
  },
];

export default FRONT_END_SHIELDS;
