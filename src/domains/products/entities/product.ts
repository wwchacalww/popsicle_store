import NotificationError from "@domains/@shared/notifications/notification.error";
import Entity from "@domains/@shared/entity/entity.abstract";
import ProductInterface from "./product.interface";
import ProductValidatorFactory from "../factories/product.validator.factory";
import { v4 } from "uuid";
import Popsicle from "./popsicle";
import BarcodeType from "@domains/@shared/value-object/barcode.vo";

interface IProduct {
  id?: string;
  name: string;
  product: string;
  cost: number;
  price: number;
  barcode?: string;
}

export default class Product extends Entity implements ProductInterface {
  private _name: string;
  private _product: string;
  private _cost: number;
  private _price: number;
  private _barcode?: BarcodeType;
  private _popsicle?: Popsicle;

  constructor({ id, name, product, cost, price, barcode }: IProduct) {
    super();
    this._id = id ? id : v4();
    this._name = name;
    this._product = product;
    this._cost = cost;
    this._price = price;
    this._barcode = barcode ? new BarcodeType(barcode) : null;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  get product(): string {
    return this._product;
  }

  get taste(): string {
    return "Manga";
  }

  get cost(): number {
    return this._cost;
  }
  get price(): number {
    return this._price;
  }
  get barcode(): string | null {
    if (this._barcode) {
      return this._barcode.value;
    }
    return null;
  }

  get popsicle() {
    return this._popsicle;
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
    ProductValidatorFactory.create().validate(this);
  }

  set popsicle(popsicle: Popsicle) {
    if (this._product === "popsicle") {
      this._popsicle = popsicle;
    } else {
      this.notification.addError({
        message: "Product is not defined",
        context: "product",
      });
    }
  }
}
