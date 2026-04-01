const { validateUsername } = require('../src/inputValidation');

test("rejects SQL injection attempt", () => {
  expect(validateUsername("admin' OR 1=1 --")).toBe(false);
});

test("accepts valid username", () => {
  expect(validateUsername("validUser123")).toBe(true);
});

