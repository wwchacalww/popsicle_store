import Popsicle from "./popsicle";
import Product from "./product";

describe("Unit test for Popsicle", () => {
  it("should create a popsicle", () => {
    const product = new Product({
      name: "Picolé de Manga Comum",
      product: "popsicle",
      cost: 0.8,
      price: 3.14,
      barcode: "12313",
    });
    const popsicle = new Popsicle({
      taste: "Manga",
      category: "Comum",
      cost: 0.8,
      price: 3.5,
      product,
      barcode: "12313",
    });
    product.popsicle = popsicle;
    expect(popsicle.taste).toBe("Manga");
    expect(popsicle.id).toBeDefined();
    expect(popsicle.Product.id).toEqual(product.id);
    expect(popsicle).toStrictEqual(product.popsicle);
  });

  it("should create a popsicle with barcode empty", () => {
    const product = new Product({
      name: "Picolé de Manga Comum",
      product: "popsicle",
      cost: 0.8,
      price: 3.14,
    });
    const popsicle = new Popsicle({
      taste: "Manga",
      category: "Comum",
      cost: 0.8,
      price: 3.5,
      product,
    });
    product.popsicle = popsicle;
    expect(popsicle.taste).toBe("Manga");
    expect(popsicle.barcode).toBeNull();
  });

  it("should change barcode, cost and price of popsicle", () => {
    const product = new Product({
      name: "Picolé de Manga Comum",
      product: "popsicle",
      cost: 0.8,
      price: 3.14,
      barcode: "12313",
    });
    const popsicle = new Popsicle({
      taste: "Manga",
      category: "Comum",
      cost: 0.8,
      price: 3.14,
      product,
      barcode: "12313",
    });
    product.popsicle = popsicle;
    expect(popsicle.cost).toBe(0.8);
    expect(popsicle.price).toBe(3.14);
    popsicle.changeBarcode("456789");
    expect(popsicle.barcode).toBe("456789");
    popsicle.changeCost(1.2);
    expect(popsicle.cost).toBe(1.2);
    popsicle.changePrice(2.25);
    expect(popsicle.price).toBe(2.25);
  });

  it("should throw error when taste is empty", () => {
    expect(() => {
      const product = new Product({
        name: "Picolé de Manga Comum",
        product: "popsicle",
        cost: 0.8,
        price: 3.14,
        barcode: "12313",
      });
      new Popsicle({
        taste: "",
        category: "Comum",
        cost: 0.8,
        price: 3.5,
        product,
        barcode: "12313",
      });
    }).toThrowError("popsicle: Taste is required");
  });

  it("should throw error when category is empty", () => {
    expect(() => {
      const product = new Product({
        name: "Picolé de Manga Comum",
        product: "popsicle",
        cost: 0.8,
        price: 3.14,
        barcode: "12313",
      });
      new Popsicle({
        taste: "Manga",
        category: "",
        cost: 0.8,
        price: 3.5,
        product,
        barcode: "12313",
      });
    }).toThrowError("popsicle: Category is required");
  });

  it("should throw error when cost is less than 0", () => {
    expect(() => {
      const product = new Product({
        name: "Picolé de Manga Comum",
        product: "popsicle",
        cost: 0.8,
        price: 3.14,
        barcode: "12313",
      });
      new Popsicle({
        taste: "Manga",
        category: "Comum",
        cost: -0.8,
        price: 3.5,
        product,
        barcode: "12313",
      });
    }).toThrowError("popsicle: Cost must be greater than zero");
  });

  it("should throw error when cost is less than 0", () => {
    expect(() => {
      const product = new Product({
        name: "Picolé de Manga Comum",
        product: "popsicle",
        cost: 0.8,
        price: 3.14,
        barcode: "12313",
      });
      new Popsicle({
        taste: "Manga",
        category: "Comum",
        cost: 0.8,
        price: -3.5,
        product,
        barcode: "12313",
      });
    }).toThrowError("popsicle: Price must be greater than zero");
  });

  it("should throw error when product is empty", () => {
    expect(() => {
      new Popsicle({
        taste: "Manga",
        category: "Comum",
        cost: 0.8,
        price: 3.5,
        product: {} as Product,
        barcode: "12313",
      });
    }).toThrowError(
      "popsicle: product.id is a required field,popsicle: product.name is a required field,popsicle: product.product is a required field"
    );
  });

  it("should throw error when cost is less than 0", () => {
    expect(() => {
      const product = new Product({
        name: "Picolé de Manga Comum",
        product: "popsicle",
        cost: 0.8,
        price: 3.14,
        barcode: "12313",
      });
      new Popsicle({
        taste: "",
        category: "",
        cost: -0.8,
        price: -3.5,
        product,
        barcode: "12313",
      });
    }).toThrowError(
      "popsicle: Taste is required,popsicle: Category is required,popsicle: Cost must be greater than zero,popsicle: Price must be greater than zero"
    );
  });
});
