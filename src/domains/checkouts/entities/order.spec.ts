import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should create an order", () => {
    const item1 = new OrderItem({
      name: "Picolé de Uva - Comum",
      price: 3,
      quantity: 4,
      product_id: "product_id_1",
      barcode: 100001
    });

    const item2 = new OrderItem({
      name: "Picolé de Lima - Comum",
      price: 4,
      quantity: 2,
      product_id: "product_id_2",
      barcode: 100002
    });
    const order = new Order([item1, item2]);
    expect(order.id).toBeDefined();
    expect(order.items.length).toBe(2);
    expect(order.total).toBe(20);
  });

  it("Should throw error when item is empty", () => {
    expect(() => {
      const order = new Order([]);

    }).toThrowError("order: items field must have at least 1 items");
  });
});