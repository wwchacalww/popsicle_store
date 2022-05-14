import OrderItem from "../entities/order_item";
import Order from "../entities/order";

interface IOrderFactoryProps {
  items: {
    barcode?: number;
    name: string;
    price: number;
    quantity: number;
    product_id: string;
  }[]
}

export default class OrderFactory {
  public static create(orderProps: IOrderFactoryProps) {
    const { items } = orderProps;
    const newItems = items.map(item => {
      const { name, price, product_id, quantity, barcode } = item;
      return new OrderItem({
        barcode,
        name,
        price,
        quantity,
        product_id
      });
    });
    const order = new Order(newItems);
    return order;
  }
}