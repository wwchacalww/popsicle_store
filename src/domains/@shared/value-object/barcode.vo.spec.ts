import BarcodeType from "./barcode.vo";

describe("Barcode Value-Object Unit Test", () => {
  it("should throw invalid barcode", () => {
    const arrange = [
      { value: 123123 },
      { value: true },
      { value: null },
      { value: undefined },
      { value: { barcode: "304928340983" } },
      { value: "1234" },
      { value: "1".repeat(26) },
    ];

    arrange.forEach((value) => {
      expect(() => new BarcodeType(value.value as any)).toThrow(
        "barcode: Barcode invalid"
      );
    });
  });

  it("should create a barcode", () => {
    const barcode = new BarcodeType("209412098A20983");
    expect(barcode.value).toBe("209412098A20983");
  });
});
