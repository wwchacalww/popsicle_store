import Popsicle from "./popsicle";

describe("Unit test for Popsicle", () => {
  it("should create a popsicle", () => {
    const popsicle = new Popsicle("Manga", "Comum", 0.80, 3.14, 12313);
    expect(popsicle.taste).toBe("Manga");
    expect(popsicle.id).toBeDefined();
  });

  it("should create a popsicle with barcode empty", () => {
    const popsicle = new Popsicle("Manga", "Comum", 0.80, 3.14);
    expect(popsicle.taste).toBe("Manga");
    expect(popsicle.barcode).toBeNull();
  });

  it("should change barcode, cost and price of popsicle", () => {
    const popsicle = new Popsicle("Manga", "Comum", 0.80, 3.14, 12313);
    expect(popsicle.cost).toBe(0.8);
    expect(popsicle.price).toBe(3.14);
    popsicle.changeBarcode(456789);
    expect(popsicle.barcode).toBe(456789);
    popsicle.changeCost(1.2);
    expect(popsicle.cost).toBe(1.2);
    popsicle.changePrice(2.25);
    expect(popsicle.price).toBe(2.25);
  });

  it("should throw error when taste is empty", () => {
    expect(() => {
      new Popsicle("", "Comum", 0.80, 3.14);
    }).toThrowError("popsicle: Taste is required");
  });

  it("should throw error when category is empty", () => {
    expect(() => {
      new Popsicle("Manga", "", 0.80, 3.14);
    }).toThrowError("popsicle: Category is required");
  });

  it("should throw error when cost is less than 0", () => {
    expect(() => {
      new Popsicle("Manga", "Comum", -11, 3.14);
    }).toThrowError("popsicle: Cost must be greater than zero");
  });

  it("should throw error when cost is less than 0", () => {
    expect(() => {
      new Popsicle("Manga", "Comum", 0.77, -3.14);
    }).toThrowError("popsicle: Price must be greater than zero");
  });

  it("should throw error when cost is less than 0", () => {
    expect(() => {
      new Popsicle("", "", -0.77, -3.14);
    }).toThrowError("popsicle: Taste is required,popsicle: Category is required,popsicle: Cost must be greater than zero,popsicle: Price must be greater than zero");
  });
});