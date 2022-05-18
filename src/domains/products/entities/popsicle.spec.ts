import Popsicle from "./popsicle";
import Product from "./product";

describe("Unit test for Popsicle", () => {
  it("should create a popsicle", () => {
    const product = new Product({
      name: "Picolé de Manga Comum",
      product: "popsicle",
      cost: 0.8,
      price: 3.14,
      barcode: BigInt(12313),
    });
    const popsicle = new Popsicle({
      taste: "Manga",
      category: "Comum",
      cost: 0.8,
      price: 3.5,
      product_id: product.id,
      barcode: BigInt(12313),
    });
    expect(popsicle.taste).toBe("Manga");
    expect(popsicle.id).toBeDefined();
    expect(popsicle.product_id).toEqual(product.id);
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
      product_id: product.id,
    });
    expect(popsicle.taste).toBe("Manga");
    expect(popsicle.barcode).toBeNull();
  });

  it("should change barcode, cost and price of popsicle", () => {
    const product = new Product({
      name: "Picolé de Manga Comum",
      product: "popsicle",
      cost: 0.8,
      price: 3.14,
      barcode: BigInt(12313),
    });
    const popsicle = new Popsicle({
      taste: "Manga",
      category: "Comum",
      cost: 0.8,
      price: 3.14,
      product_id: product.id,
      barcode: BigInt(12313),
    });
    expect(popsicle.cost).toBe(0.8);
    expect(popsicle.price).toBe(3.14);
    popsicle.changeBarcode(BigInt(456789));
    expect(popsicle.barcode).toBe(BigInt(456789));
    popsicle.changeCost(1.2);
    expect(popsicle.cost).toBe(1.2);
    popsicle.changePrice(2.25);
    expect(popsicle.price).toBe(2.25);
  });

  it("should throw error when taste is empty", () => {
    expect(() => {
      new Popsicle({
        taste: "",
        category: "Comum",
        cost: 0.8,
        price: 3.5,
        product_id: "fake_id",
        barcode: BigInt(12313),
      });
    }).toThrowError("popsicle: Taste is required");
  });

  it("should throw error when category is empty", () => {
    expect(() => {
      new Popsicle({
        taste: "Manga",
        category: "",
        cost: 0.8,
        price: 3.5,
        product_id: "test",
        barcode: BigInt(12313),
      });
    }).toThrowError("popsicle: Category is required");
  });

  it("should throw error when cost is less than 0", () => {
    expect(() => {
      new Popsicle({
        taste: "Manga",
        category: "Comum",
        cost: -0.8,
        price: 3.5,
        product_id: "product.id",
        barcode: BigInt(12313),
      });
    }).toThrowError("popsicle: Cost must be greater than zero");
  });

  it("should throw error when cost is less than 0", () => {
    expect(() => {
      new Popsicle({
        taste: "Manga",
        category: "Comum",
        cost: 0.8,
        price: -3.5,
        product_id: "product.id",
        barcode: BigInt(12313),
      });
    }).toThrowError("popsicle: Price must be greater than zero");
  });

  it("should throw error when product ID is empty", () => {
    expect(() => {
      new Popsicle({
        taste: "Manga",
        category: "Comum",
        cost: 0.8,
        price: 3.5,
        product_id: "",
        barcode: BigInt(12313),
      });
    }).toThrowError("popsicle: Product ID is required");
  });

  it("should throw error when cost is less than 0", () => {
    expect(() => {
      new Popsicle({
        taste: "",
        category: "",
        cost: -0.8,
        price: -3.5,
        product_id: "",
        barcode: BigInt(12313),
      });
    }).toThrowError(
      "popsicle: Taste is required,popsicle: Category is required,popsicle: Product ID is required,popsicle: Cost must be greater than zero,popsicle: Price must be greater than zero"
    );
  });
});
