import Product from "./product";

describe("Unit test for Product", () => {
  it("should create a popsicle", () => {
    const product = new Product({
      id: "asdfg",
      name: "Picolé sabor Manga",
      product: "popsicle",
      cost: 1.5,
      price: 3.5,
      barcode: "23409834",
    });
    expect(product.product).toBe("popsicle");
    expect(product.name).toBe("Picolé sabor Manga");
    expect(product.id).toEqual("asdfg");
  });

  it("should create a product with barcode empty", () => {
    const product = new Product({
      name: "Picolé sabor Manga",
      product: "popsicle",
      cost: 1.5,
      price: 3.5,
    });
    expect(product.barcode).toBeNull();
  });

  it("should change barcode, cost and price of product", () => {
    const product = new Product({
      name: "Picolé sabor Manga",
      product: "popsicle",
      cost: 1.5,
      price: 3.5,
    });
    expect(product.cost).toBe(1.5);
    expect(product.price).toBe(3.5);
    product.changeBarcode("456789");
    expect(product.barcode).toBe("456789");
    product.changeCost(1.2);
    expect(product.cost).toBe(1.2);
    product.changePrice(2.25);
    expect(product.price).toBe(2.25);
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product({
        name: "",
        product: "popsicle",
        cost: 1.5,
        price: 3.5,
      });
    }).toThrowError("product: Name is required");
  });

  it("should throw error when product is empty", () => {
    expect(() => {
      new Product({
        name: "Picolé de Limão",
        product: "",
        cost: 1.5,
        price: 3.5,
      });
    }).toThrowError("product: Product is required");
  });

  it("should throw error when cost is less than 0", () => {
    expect(() => {
      new Product({
        name: "Picolé de Limão",
        product: "popsicle",
        cost: -1.5,
        price: 3.5,
      });
    }).toThrowError("product: Cost must be greater than zero");
  });

  it("should throw error when price is less than 0", () => {
    expect(() => {
      new Product({
        name: "Picolé de Limão",
        product: "popsicle",
        cost: 1.5,
        price: -3.5,
      });
    }).toThrowError("product: Price must be greater than zero");
  });

  it("should throw error when cost is less than 0", () => {
    expect(() => {
      new Product({
        name: "",
        product: "",
        cost: -1.5,
        price: -3.5,
      });
    }).toThrowError(
      "product: Name is required,product: Product is required,product: Cost must be greater than zero,product: Price must be greater than zero"
    );
  });
});
