const EXAMPLE_JEST_TEST = `function sum(a: number, b: number): number {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
`;

export default EXAMPLE_JEST_TEST;
