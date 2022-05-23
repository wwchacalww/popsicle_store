import ProductFactory from "./product.factory";

describe("Unit test for Product Factory", () => {
  it("should create a popsicle with Product Factory", () => {
    const popsicle = ProductFactory.createPopsicle({
      taste: "Limão",
      category: "Especial",
      cost: 1.25,
      price: 2.89,
      barcode: "1049823049",
    });
    expect(popsicle.Product.product).toBe("popsicle");
    expect(popsicle.Product.name).toBe("Picolé de Limão - Especial");
    expect(popsicle.taste).toEqual("Limão");
  });

  it("should create a popsicle with Product Factory with barcode empty", () => {
    const popsicle = ProductFactory.createPopsicle({
      taste: "Limão",
      category: "Especial",
      cost: 1.25,
      price: 2.89,
    });
    expect(popsicle.Product.product).toBe("popsicle");
    expect(popsicle.Product.name).toBe("Picolé de Limão - Especial");
    expect(popsicle.taste).toEqual("Limão");
  });

  it("should throw error when taste is empty", () => {
    expect(() => {
      ProductFactory.createPopsicle({
        taste: "",
        category: "Especial",
        cost: 1.25,
        price: 2.89,
        barcode: "1049823049",
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
        barcode: "1049823049",
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
        barcode: "1049823049",
      });
    }).toThrowError("product: Price must be greater than zero");
  });
});
