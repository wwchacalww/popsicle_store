import { v4 } from "uuid";
import OrderFactory from "./order.factory";

describe("Order factory unit test", () => {
  it("should create an order", () => {
    const orderProps = {
      items: [{
        barcode: 134234,
        name: "Picolé de Manga - Comum",
        price: 3,
        product_id: v4(),
        quantity: 2,
      }, {
        barcode: 234234,
        name: "Picolé de Cajamanga - Premium",
        price: 4,
        product_id: v4(),
        quantity: 3,
      }]
    };

    const order = OrderFactory.create(orderProps);

    expect(order.total).toBe(18);
    expect(order.items.length).toBe(2);
  })
});