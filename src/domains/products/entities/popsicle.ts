import NotificationError from "../../@shared/notifications/notification.error";
import Entity from "../../@shared/entity/entity.abstract";
import PopsicleValidatorFactory from "../factories/popsicle.validator.factory";
import ProductInterface from "./product.interface";
import { v4 } from "uuid";

interface IPopsicle {
  id?: string;
  taste: string;
  category: string;
  cost: number;
  price: number;
  barcode?: bigint;
  product_id: string;
}

export default class Popsicle extends Entity implements ProductInterface {
  private _taste: string;
  private _category: string;
  private _cost: number;
  private _price: number;
  private _barcode?: bigint;
  private _product_id: string;

  constructor({
    id,
    taste,
    category,
    cost,
    price,
    barcode,
    product_id,
  }: IPopsicle) {
    super();
    this._id = id ? id : v4();
    this._taste = taste;
    this._category = category;
    this._cost = cost;
    this._price = price;
    this._barcode = barcode;
    this._product_id = product_id;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get taste(): string {
    return this._taste;
  }
  get category(): string {
    return this._category;
  }
  get cost(): number {
    return this._cost;
  }
  get price(): number {
    return this._price;
  }
  get product_id(): string {
    return this._product_id;
  }
  get barcode(): bigint | null {
    if (this._barcode) {
      return this._barcode;
    }
    return null;
  }

  changeCost(cost: number) {
    this._cost = cost;
  }

  changePrice(price: number) {
    this._price = price;
  }

  changeBarcode(barcode: bigint) {
    this._barcode = barcode;
  }

  validate() {
    PopsicleValidatorFactory.create().validate(this);
  }
}
