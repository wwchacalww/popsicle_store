import OrderItem from "./order_item";

describe("Unit test for Order Item", () => {
  it("should create an order item", () => {
    const orderItem = new OrderItem({
      name: "Picolé sabor Manga",
      product_id: "product_id",
      price: 3.5,
      quantity: 4,
      barcode: 234146,
    });
    expect(orderItem.name).toBe("Picolé sabor Manga");
    expect(orderItem.total).toEqual(14);
  });

  it("should create an order item with barcode empty", () => {
    const orderItem = new OrderItem({
      name: "Picolé sabor Manga",
      product_id: "product_id",
      price: 3.5,
      quantity: 4,
    });
    expect(orderItem.name).toBe("Picolé sabor Manga");
    expect(orderItem.total).toEqual(14);
    expect(orderItem.barcode).toBeUndefined();
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new OrderItem({
        name: "",
        product_id: "product_id",
        price: 3.5,
        quantity: 4,
        barcode: 234146,
      });
    }).toThrowError("order_item: Name is required");
  });

  it("should throw error when product is empty", () => {
    expect(() => {
      new OrderItem({
        name: "Picolé de Limão - Comum",
        product_id: "",
        price: 3.5,
        quantity: 4,
        barcode: 234146,
      });
    }).toThrowError("order_item: Product ID is required");
  });

  it("should throw error when price is less than 0", () => {
    expect(() => {
      new OrderItem({
        name: "Picolé de Limão - Comum",
        product_id: "product_id",
        price: -3.5,
        quantity: 4,
        barcode: 234146,
      });
    }).toThrowError("order_item: Price must be greater than zero");
  });

  it("should throw error when quantity is less than 0", () => {
    expect(() => {
      new OrderItem({
        name: "Picolé de Limão - Comum",
        product_id: "product_id",
        price: 3.5,
        quantity: -4,
        barcode: 234146,
      });
    }).toThrowError("order_item: Quantity must be greater than zero");
  });

  it("should throw error when cost is less than 0", () => {
    expect(() => {
      new OrderItem({
        name: "",
        product_id: "",
        price: -3.5,
        quantity: -4,
      });
    }).toThrowError("order_item: Name is required,order_item: Quantity must be greater than zero,order_item: Price must be greater than zero,order_item: Product ID is required");
  });
});