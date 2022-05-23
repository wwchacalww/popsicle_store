import NotificationError from "../../@shared/notifications/notification.error";
import Entity from "../../@shared/entity/entity.abstract";
import PopsicleValidatorFactory from "../factories/popsicle.validator.factory";
import ProductInterface from "./product.interface";
import Product from "./product";
import BarcodeType from "@domains/@shared/value-object/barcode.vo";

interface IPopsicle {
  id?: string;
  taste: string;
  category: string;
  cost: number;
  price: number;
  barcode?: string;
  product: Product;
}

export default class Popsicle extends Entity implements ProductInterface {
  private _taste: string;
  private _category: string;
  private _cost: number;
  private _price: number;
  private _barcode?: BarcodeType;
  private _product: Product;

  constructor({
    id,
    taste,
    category,
    cost,
    product,
    price,
    barcode,
  }: IPopsicle) {
    super(id);
    this._taste = taste;
    this._category = category;
    this._cost = cost;
    this._price = price;
    this._barcode = barcode ? new BarcodeType(barcode) : null;
    this._product = product;
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
  get Product(): Product {
    return this._product;
  }
  get barcode(): string | null {
    if (this._barcode) {
      return this._barcode.value;
    }
    return null;
  }

  changeCost(cost: number) {
    this._cost = cost;
  }

  changePrice(price: number) {
    this._price = price;
  }

  changeBarcode(barcode: string) {
    this._barcode = new BarcodeType(barcode);
  }

  validate() {
    PopsicleValidatorFactory.create().validate(this);
  }
}
