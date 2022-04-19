import { addNumber } from "./util";

it("add to numbers", () => {
  const result = addNumber(1, 2);
  expect(result).toBe(3);
});
