import { setRemote } from "../controllers/git";

describe("testing git methods", () => {
  test("correct owner and repository are set", () => {
    const [OWNER, REPOSITORY] = setRemote("git@github.com:ShaneLucy/project-scaffolding.git");
    expect(OWNER).toEqual("ShaneLucy");
    expect(REPOSITORY).toEqual("project-scaffolding");
  });

  test("if remote can't be detected owner and repository should be false", () => {
    const [OWNER, REPOSITORY] = setRemote("");
    expect(OWNER).toEqual(false);
    expect(REPOSITORY).toEqual(false);
  });
});
