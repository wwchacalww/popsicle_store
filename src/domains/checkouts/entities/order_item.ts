import Entity from "@domains/@shared/entity/entity.abstract";
import NotificationError from "@domains/@shared/notifications/notification.error";
import { v4 } from "uuid";
import OrderItemValidatorFactory from "../factories/order_item.validator.factory";

interface IOrderItem {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  product_id: string;
  barcode?: number;
}

export default class OrderItem extends Entity {
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _total: number;
  private _barcode?: number;
  private _product_id: string;
  constructor({
    id,
    name,
    price,
    quantity,
    product_id,
    barcode,
  }: IOrderItem) {
    super()
    this._id = id ? id : v4();
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this._product_id = product_id;
    this._total = quantity * price;
    this._barcode = barcode;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  get total(): number {
    return this._total;
  }

  get product_id(): string {
    return this._product_id;
  }

  get barcode(): number | undefined {
    return this._barcode;
  }

  validate() {
    OrderItemValidatorFactory.create().validate(this);
  }
}