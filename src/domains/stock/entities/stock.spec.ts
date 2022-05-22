import Product from "@domains/products/entities/product";
import ProductFactory from "@domains/products/factories/product.factory";
import Stock from "./stock";

describe("Unit test for Stock", () => {
  it("should register the receipt of products in stock", () => {
    const popsicle = ProductFactory.createPopsicle({
      taste: "Uva",
      category: "Comum",
      cost: 1.23,
      price: 3,
      barcode: BigInt(1802834),
    });
    const product = new Product({
      id: popsicle.Product.id,
      product: "popsicle",
      name: popsicle.Product.name,
      cost: popsicle.Product.cost,
      price: popsicle.Product.price,
      barcode: popsicle.Product.barcode,
    });
    const stock = new Stock({
      product,
      quantity: 4,
    });
    expect(stock.product.name).toEqual("Picolé de Uva - Comum");
    expect(stock.subtotalCost).toEqual(4.92);
    expect(stock.subtotalPrice).toEqual(12);
    expect(stock.show).toStrictEqual({
      barcode: BigInt(1802834),
      description: "Picolé de Uva - Comum",
      unit_price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(3),
      quantity: 4,
      subtotal: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(12),
    });
  });

  it("should register the receipt of products in stock with negative quantity", () => {
    const popsicle = ProductFactory.createPopsicle({
      taste: "Uva",
      category: "Comum",
      cost: 1.23,
      price: 3,
      barcode: BigInt(1802834),
    });
    const product = new Product({
      id: popsicle.Product.id,
      product: "popsicle",
      name: popsicle.Product.name,
      cost: popsicle.Product.cost,
      price: popsicle.Product.price,
      barcode: popsicle.Product.barcode,
    });
    const stock = new Stock({
      product,
      quantity: -4,
    });
    expect(stock.product.name).toEqual("Picolé de Uva - Comum");
    expect(stock.subtotalCost).toEqual(-4.92);
    expect(stock.subtotalPrice).toEqual(-12);
    expect(stock.show).toStrictEqual({
      barcode: BigInt(1802834),
      description: "Picolé de Uva - Comum",
      unit_price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(3),
      quantity: -4,
      subtotal: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(-12),
    });
  });

  it("should register into stock with barcode empty", () => {
    const popsicle = ProductFactory.createPopsicle({
      taste: "Uva",
      category: "Comum",
      cost: 1.23,
      price: 3,
    });
    const product = new Product({
      id: popsicle.Product.id,
      product: "popsicle",
      name: popsicle.Product.name,
      cost: popsicle.Product.cost,
      price: popsicle.Product.price,
      barcode: popsicle.Product.barcode,
    });
    const stock = new Stock({
      product,
      quantity: 4,
    });
    expect(stock.product.name).toEqual("Picolé de Uva - Comum");
    expect(stock.subtotalCost).toEqual(4.92);
    expect(stock.subtotalPrice).toEqual(12);
    expect(stock.show).toStrictEqual({
      barcode: undefined,
      description: "Picolé de Uva - Comum",
      unit_price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(3),
      quantity: 4,
      subtotal: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(12),
    });
  });

  it("should throw error when register into stock without product", () => {
    expect(() => {
      new Stock({ quantity: 4, product: {} as Product });
    }).toThrowError(
      "stock: Cost do not be equal zero,stock: Price do not be equal zero"
    );
  });
});
