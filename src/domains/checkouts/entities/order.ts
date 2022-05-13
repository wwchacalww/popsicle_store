import Entity from "@domains/@shared/entity/entity.abstract";
import NotificationError from "@domains/@shared/notifications/notification.error";
import { v4 } from "uuid";
import OrderValidatorFactory from "../factories/order.validator";
import OrderItem from "./order_item";

interface OutputOrderItemShow {
  barcode?: number;
  name: string;
  price: string;
  quantity: number;
  subtotal: string;
}

interface OutputOrderShow {
  order: {
    items: OutputOrderItemShow[],
    total: string;
    created_at: string;
  }

}
export default class Order extends Entity {
  private _items: OrderItem[];
  private _created_at: Date;
  private _total: number;

  constructor(items: OrderItem[], id?: string) {
    super();
    this._id = id ? id : v4();
    this._items = items;
    this._created_at = new Date();
    this._total = this.total;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get id(): string {
    return this._id;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  get createAt(): string {
    const date = new Intl.DateTimeFormat('pt-BR', {
      year: "numeric", month: "numeric", day: "numeric",
      hour: "numeric", minute: "numeric", second: "numeric",
      hour12: false,
      timeZone: "America/Sao_Paulo"
    }).format(this._created_at);
    return date;
  }

  get total(): number {
    return this._items.reduce((acc, item) => acc + item.total, 0);
  }

  get show(): OutputOrderShow {
    const items: OutputOrderItemShow[] = [];
    this._items.map((item) => {
      const orderItem = {
        barcode: item.barcode ? item.barcode : 0,
        name: item.name,
        price: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price),
        quantity: item.quantity,
        subtotal: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total),
      };
      items.push(orderItem);
    });

    const created_at = new Intl.DateTimeFormat('pt-BR', {
      year: "numeric", month: "numeric", day: "numeric",
      hour: "numeric", minute: "numeric", second: "numeric",
      hour12: false,
      timeZone: "America/Sao_Paulo"
    }).format(this._created_at);

    return {
      order: {
        items,
        total: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.total),
        created_at,
      }
    }
  }

  validate() {
    OrderValidatorFactory.create().validate(this);
  }
}