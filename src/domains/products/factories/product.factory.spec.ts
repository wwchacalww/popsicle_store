import ProductFactory from "./product.factory";

describe("Unit test for Product Factory", () => {
  it("should create a popsicle with Product Factory", () => {
    const popsicle = ProductFactory.createPopsicle({
      taste: "Limão",
      category: "Especial",
      cost: 1.25,
      price: 2.89,
      barcode: BigInt(1049823049),
    });
    expect(popsicle.product.product).toBe("popsicle");
    expect(popsicle.product.name).toBe("Picolé de Limão - Especial");
    expect(popsicle.popsicle.taste).toEqual("Limão");
  });

  it("should throw error when taste is empty", () => {
    expect(() => {
      ProductFactory.createPopsicle({
        taste: "",
        category: "Especial",
        cost: 1.25,
        price: 2.89,
        barcode: BigInt(1049823049),
      });
    }).toThrowError("popsicle: Taste is required");
  });

  it("should throw error when cost is less than 0", () => {
    expect(() => {
      ProductFactory.createPopsicle({
        taste: "",
        category: "Especial",
        cost: -1.25,
        price: 2.89,
        barcode: BigInt(1049823049),
      });
    }).toThrowError("product: Cost must be greater than zero");
  });

  it("should throw error when cost is less than 0", () => {
    expect(() => {
      ProductFactory.createPopsicle({
        taste: "",
        category: "Especial",
        cost: 1.25,
        price: -2.89,
        barcode: BigInt(1049823049),
      });
    }).toThrowError("product: Price must be greater than zero");
  });
});
