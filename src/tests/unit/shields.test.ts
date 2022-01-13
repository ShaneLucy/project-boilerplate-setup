import {
  generateMarkdownForShields,
  setOtherShields,
  setGithubShields,
  setGithubShieldUrl,
} from "../../controllers/shields";

describe("github shields  are set correctly", () => {
  test("that the correct url is set", () => {
    const GITHUB_SHIELD = setGithubShieldUrl("ShaneLucy", "project-boilerplate-setup", "build");
    expect(GITHUB_SHIELD).toEqual({
      name: "build",
      url:
        "https://github.com/ShaneLucy/project-boilerplate-setup/actions/workflows/build.yml/badge.svg",
    });
  });

  test("that the placeholders are in url if git remote info doesn't exist", () => {
    const GITHUB_SHIELD = setGithubShieldUrl("<OWNER>", "<REPOSITORY>", "build");
    expect(GITHUB_SHIELD).toEqual({
      name: "build",
      url: "https://github.com/<OWNER>/<REPOSITORY>/actions/workflows/build.yml/badge.svg",
    });
  });

  test("that the placeholders are replaced with owner and repository if they have been set", () => {
    const GITHUB_SHIELDS = setGithubShields(
      {
        githubActions: [
          { name: "build", action: "do something" },
          { name: "test", action: "do something" },
        ],
        owner: "ShaneLucy",
        repository: "project-boiler-plate-setup",
      },
      ""
    );

    expect(GITHUB_SHIELDS).toEqual([
      {
        name: "build",
        url:
          "https://github.com/ShaneLucy/project-boiler-plate-setup/actions/workflows/build.yml/badge.svg",
      },
      {
        name: "test",
        url:
          "https://github.com/ShaneLucy/project-boiler-plate-setup/actions/workflows/test.yml/badge.svg",
      },
    ]);
  });

  test("that the end-to-end shield is included when the framework is set", () => {
    const GITHUB_SHIELDS = setGithubShields(
      {
        githubActions: [
          { name: "end-to-end-tests", action: "do something" },
          { name: "test", action: "do something" },
        ],
        owner: "ShaneLucy",
        repository: "project-boiler-plate-setup",
      },
      "svelte"
    );

    expect(GITHUB_SHIELDS).toContainEqual({
      name: "end-to-end-tests",
      url:
        "https://github.com/ShaneLucy/project-boiler-plate-setup/actions/workflows/end-to-end-tests.yml/badge.svg",
    });
  });

  test("that the end-to-end shield is not included when the framework is not set", () => {
    const GITHUB_SHIELDS = setGithubShields(
      {
        githubActions: [
          { name: "end-to-end-tests", action: "do something" },
          { name: "test", action: "do something" },
        ],
        owner: "ShaneLucy",
        repository: "project-boiler-plate-setup",
      },
      ""
    );

    expect(GITHUB_SHIELDS).toHaveLength(1);
  });
});

describe("that the correct shields to use are determined from the project configuration", () => {
  test("that the front end shields are included if the framework is set", () => {
    const SHARED_SHIELDS = setOtherShields({
      framework: "svelte",
      shields: [
        {
          name: "coverage",
          url: "https://somenicewebsite.io/<OWNER>/<REPOSITORY>",
        },
      ],
      frontEndShields: [
        {
          name: "coverage",
          url: "https://anothernicewebsite.dev/<OWNER>/<REPOSITORY>",
        },
      ],
      owner: "ShaneLucy",
      repository: "project-boilerplate-setup",
    });

    expect(SHARED_SHIELDS).toEqual([
      {
        name: "coverage",
        url: "https://somenicewebsite.io/ShaneLucy/project-boilerplate-setup",
      },
      {
        name: "coverage",
        url: "https://anothernicewebsite.dev/ShaneLucy/project-boilerplate-setup",
      },
    ]);
  });

  test("that the front end shields aren't included if the framework isn't set", () => {
    const SHARED_SHIELDS = setOtherShields({
      framework: "",
      shields: [
        {
          name: "coverage",
          url: "https://somenicewebsite.io/<OWNER>/<REPOSITORY>",
        },
      ],
      frontEndShields: [
        {
          name: "end-to-end-tests",
          url: "https://anothernicewebsite.dev/<OWNER>/<REPOSITORY>",
        },
      ],
      owner: "ShaneLucy",
      repository: "project-boilerplate-setup",
    });

    expect(SHARED_SHIELDS).toContainEqual({
      name: "coverage",
      url: "https://somenicewebsite.io/ShaneLucy/project-boilerplate-setup",
    });

    expect(
      SHARED_SHIELDS.includes({
        name: "end-to-end-tests",
        url: "https://anothernicewebsite.dev/<OWNER>/<REPOSITORY>",
      })
    ).toBeFalsy();
  });
});

describe("testing that the <OWNER> and <REPOSITORY> values are replaced correctly", () => {
  test("that if the owner is blank then the placeholder remains", () => {
    const SHARED_SHIELDS = setOtherShields({
      framework: "",
      shields: [
        {
          name: "coverage",
          url: "https://somenicewebsite.io/<OWNER>/<REPOSITORY>",
        },
      ],
      frontEndShields: [
        {
          name: "coverage",
          url: "https://anothernicewebsite.dev/<OWNER>/<REPOSITORY>",
        },
      ],
      owner: "<OWNER>",
      repository: "project-boilerplate-setup",
    });

    expect(SHARED_SHIELDS).toEqual([
      {
        name: "coverage",
        url: "https://somenicewebsite.io/<OWNER>/project-boilerplate-setup",
      },
    ]);
  });

  test("that if the repository is blank then the placeholder remains", () => {
    const SHARED_SHIELDS = setOtherShields({
      framework: "",
      shields: [
        {
          name: "coverage",
          url: "https://somenicewebsite.io/<OWNER>/<REPOSITORY>",
        },
      ],
      frontEndShields: [
        {
          name: "coverage",
          url: "https://anothernicewebsite.dev/<OWNER>/<REPOSITORY>",
        },
      ],
      owner: "ShaneLucy",
      repository: "<REPOSITORY>",
    });

    expect(SHARED_SHIELDS).toEqual([
      {
        name: "coverage",
        url: "https://somenicewebsite.io/ShaneLucy/<REPOSITORY>",
      },
    ]);
  });
});

describe("that the correct markdown is generated", () => {
  test("markdown is correct", () => {
    const GITHUB_SHIELDS = [
      {
        name: "build",
        url:
          "https://github.com/ShaneLucy/project-boilerplate-setup/actions/workflows/build.yml/badge.svg",
      },
    ];

    const OTHER_SHIELDS = [
      {
        name: "coverage",
        url: "https://anothernicewebsite.dev/ShaneLucy/project-boilerplate-setup",
      },
    ];

    const EXPECTED_OUTCOME = [
      "[![build](https://github.com/ShaneLucy/project-boilerplate-setup/actions/workflows/build.yml/badge.svg)](https://github.com/ShaneLucy/project-boilerplate-setup/actions/workflows/build.yml/badge.svg) ",
      "[![coverage](https://anothernicewebsite.dev/ShaneLucy/project-boilerplate-setup)](https://anothernicewebsite.dev/ShaneLucy/project-boilerplate-setup)",
    ];
    const MARKDOWN = generateMarkdownForShields([...GITHUB_SHIELDS, ...OTHER_SHIELDS]);

    expect(MARKDOWN).toEqual(EXPECTED_OUTCOME);
  });
});
