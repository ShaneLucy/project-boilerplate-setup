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
  const configuredUrls = setProjectShieldsBaseUrls().flatMap(
    (shield): Shield => {
      let url = shield.url.replace(":owner", OWNER);
      url = url.replace(":repo", REPOSITORY);
      return {
        name: shield.name,
        url,
      };
    }
  );

  return [...setGithubShieldUrls(), ...configuredUrls];
};

const setShields = (): Array<string> =>
  configureShieldUrls().map((shield) => `[![${shield.name}](${shield.url})](${shield.url})`);

export const SHIELDS = setShields();
