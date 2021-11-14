import { setRemote } from "../controllers/git";

describe("testing git methods", () => {
  test("correct owner and repository are set", () => {
    const [OWNER, REPOSITORY] = setRemote("git@github.com:ShaneLucy/project-scaffolding.git");
    expect(OWNER).toBe("ShaneLucy");
    expect(REPOSITORY).toBe("project-scaffolding");
  });

  test("if remote can't be detected owner and repository should be false", () => {
    const [OWNER, REPOSITORY] = setRemote("");
    expect(OWNER).toBe("<OWNER>");
    expect(REPOSITORY).toBe("<REPOSITORY>");
  });
});
