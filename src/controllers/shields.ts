import { GITHUB_ACTIONS, setGithubShieldUrl, SHIELD_URLS, FRONT_END_SHIELD_URLS } from "../globals";
import { FRAMEWORK } from "./framework";
import { OWNER, REPOSITORY } from "./git";
import type { Shield } from "../types";

export const setProjectShieldsBaseUrls = (): Array<Shield> => {
  let shields: Array<Shield> = [];
  if (FRAMEWORK.length === 0) {
    shields = SHIELD_URLS;
  } else {
    shields = [...SHIELD_URLS, ...FRONT_END_SHIELD_URLS];
  }

  return shields;
};

const setGithubShieldUrls = (): Array<Shield> =>
  GITHUB_ACTIONS.map((action) => setGithubShieldUrl(OWNER, REPOSITORY, action.name));

const configureShieldUrls = (): Array<Shield> => {
  const CONFIGURED_URLS = setProjectShieldsBaseUrls().flatMap(
    (shield): Shield => {
      let url = shield.url.replace("<OWNER>", OWNER);
      url = url.replace("<REPOSITORY>", REPOSITORY);
      return {
        name: shield.name,
        url,
      };
    }
  );

  return [...setGithubShieldUrls(), ...CONFIGURED_URLS];
};

const setShields = (): Array<string> => {
  const CONFIGURED_URLS = configureShieldUrls();
  return CONFIGURED_URLS.map((shield, index) =>
    index === CONFIGURED_URLS.length - 1
      ? `[![${shield.name}](${shield.url})](${shield.url})`
      : `[![${shield.name}](${shield.url})](${shield.url}) `
  );
};

export const SHIELDS = setShields();
