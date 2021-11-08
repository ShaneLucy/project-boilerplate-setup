import { GITHUB_ACTIONS, SHIELDS, FRONT_END_SHIELDS } from "../globals";
import { FRAMEWORK } from "./framework";
import { OWNER, REPOSITORY } from "./git";
import type { GithubActions, Shield } from "../types";

interface BaseUrlArgs {
  framework: string;
  shields: Array<Shield>;
  frontEndShields: Array<Shield>;
  owner: string;
  repository: string;
}

export const setOtherShields = (args: BaseUrlArgs): Array<Shield> => {
  let shields: Array<Shield> = [];
  if (args.framework.length === 0) {
    shields = args.shields;
  } else {
    shields = [...args.shields, ...args.frontEndShields];
  }

  shields = shields.map((shield) => ({
    name: shield.name,
    url: shield.url.replace("<OWNER>", args.owner),
  }));

  shields = shields.map((shield) => ({
    name: shield.name,
    url: shield.url.replace("<REPOSITORY>", args.repository),
  }));

  return shields;
};

interface GithubShieldArgs {
  githubActions: Array<GithubActions>;
  owner: string;
  repository: string;
}

export const setGithubShieldUrl = (owner: string, repository: string, file: string): Shield => ({
  name: file,
  url: `https://github.com/${owner}/${repository}/actions/workflows/${file}.yml/badge.svg`,
});

export const setGithubShields = (args: GithubShieldArgs): Array<Shield> =>
  args.githubActions.map((action) => setGithubShieldUrl(args.owner, args.repository, action.name));

export const generateMarkdownForShields = (configuredShields: Array<Shield>): Array<string> =>
  configuredShields.map((shield, index) =>
    index === configuredShields.length - 1
      ? `[![${shield.name}](${shield.url})](${shield.url})`
      : `[![${shield.name}](${shield.url})](${shield.url}) `
  );
const OTHER_SHIELDS = setOtherShields({
  framework: FRAMEWORK,
  shields: SHIELDS,
  frontEndShields: FRONT_END_SHIELDS,
  owner: OWNER,
  repository: REPOSITORY,
});

const GITHUB_SHIELDS = setGithubShields({
  githubActions: GITHUB_ACTIONS,
  owner: OWNER,
  repository: REPOSITORY,
});

export const PROJECT_SHIELDS = generateMarkdownForShields([...GITHUB_SHIELDS, ...OTHER_SHIELDS]);
