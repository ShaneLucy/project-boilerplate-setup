type PackageJsonPerson =
  | string
  | {
      name: string;
      email?: string;
      url?: string;
    };

export interface PackageJson {
  name?: string;
  version?: string;
  description?: string;
  keywords?: string[];
  homepage?: string;
  bugs?:
    | string
    | {
        url?: string;
        email?: string;
      };
  licence?: string;
  repository?:
    | string
    | {
        type: string;
        url: string;
        directory?: string;
      };
  private?: boolean;
  author?: PackageJsonPerson;
  contributors?: PackageJsonPerson[];
  files?: string[];
  main?: string;
  browser?: string;
  bin?: string | Record<string, string>;
  man?: string | string[];
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  types?: string;
  typings?: string;
  module?: string;
  type?: "module" | "commonjs";
  exports?:
    | string
    | Record<
        "import" | "require" | "." | "node" | "browser" | string,
        string | Record<"import" | "require" | string, string>
      >;
  workspaces?: string[];
}

export interface Hooks {
  name: string;
  action: string;
}

export interface GithubActions {
  name: string;
  action: string;
}
