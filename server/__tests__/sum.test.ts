import sum from "../src/sum";

describe("Test", () => {
  it("should execute correctly", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
