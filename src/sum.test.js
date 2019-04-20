const sum = require("./sum");

test("it can sum two numbers", () => {
  expect(sum(1, 2)).toEqual(3);
});
