const thousandSeparator = require("../tests/thousandSeparator");

test("Convierte el número 3000 a 3.000 en string", () => {
  expect(thousandSeparator(3000)).toBe("3.000");
});
test("Convierte el número 100000 a 100.000 en string", () => {
  expect(thousandSeparator(100000)).toBe("100.000");
});
test("Convierte el número 1000000 a 1.000.000 en string", () => {
  expect(thousandSeparator(1000000)).toBe("1.000.000");
});
test("Convierte el número 1100.24 a 1.100,24 en string", () => {
  expect(thousandSeparator(1100.24)).toBe("1.100,24");
});
