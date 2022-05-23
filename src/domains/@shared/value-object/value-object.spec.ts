import ValueObject from "./value-object";

class StubValueObject extends ValueObject {}
describe("Value-object unit test", () => {
  test("create value-object", () => {
    let vo = new StubValueObject("Value string object");
    expect(vo.value).toBe("Value string object");
    vo = new StubValueObject({ prop: "Value String" });
    expect(vo.value).toStrictEqual({ prop: "Value String" });
    vo = new StubValueObject(345);
    expect(vo.value).toBe(345);
  });

  test("Convert value to string", () => {
    const date = new Date();
    let arrange = [
      { recived: "", expected: "" },
      { recived: 0, expected: "0" },
      { recived: 1, expected: "1" },
      { recived: -5, expected: "-5" },
      {
        recived: { prop: "Value1" },
        expected: JSON.stringify({ prop: "Value1" }),
      },
      { recived: true, expected: "true" },
      { recived: false, expected: "false" },
      { recived: date, expected: date.toString() },
    ];

    arrange.forEach((value) => {
      let vo = new StubValueObject(value.recived);
      expect(vo.toString()).toBe(value.expected);
    });
  });
});
