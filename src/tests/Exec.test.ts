import Exec from "../controllers/Exec";

describe("running asynchronous methods", () => {
  test("When a valid command is passed, it is ran sucessfully and returns the correct value", async () => {
    const RESPONSE = Exec.run(`echo "Hi!"`);
    expect(RESPONSE).toBeUndefined();
  });

  test("When passed an invalid command, it returns an error but program continues executing", async () => {
    const RESPONSE = Exec.run(`idfdjfnf`);
    expect(RESPONSE).toBeUndefined();
  });
});

describe("running supplied command synchronously", () => {
  test("When a valid command is passed, it is ran sucessfully and returns the correct value", () => {
    const RESPONSE = Exec.runSync(`echo "Hi!"`);
    expect(RESPONSE).toEqual("Hi!\n");
  });

  test("When passed an invalid command, it returns an error but program continues executing", () => {
    const RESPONSE = Exec.runSync(`idfdjfnf`);

    expect(RESPONSE.toString()).toContain("Error: Command failed");
  });
});
