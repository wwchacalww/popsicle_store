import Product from "../../products/entities/product";
import Entity from "../../@shared/entity/entity.abstract";
import StockValidatorFactory from "../factory/stock.validator.factory";
import NotificationError from "@domains/@shared/notifications/notification.error";
import { v4 } from "uuid";

export interface IStockEntity {
  id?: string;
  product: Product,
  quantity: number,
}

interface IOutputStockEntity {
  barcode?: number,
  description: string,
  unit_price: string,
  quantity: number,
  subtotal: string,
}

export default class Stock extends Entity {
  private _product: Product;
  private _unit_cost: number;
  private _unit_price: number;
  private _quantity: number;
  private _subtotal_cost: number;
  private _subtotal_price: number;
  private _barcode?: number;
  private _created_at: Date

  constructor({
    id,
    product,
    quantity,
  }: IStockEntity) {
    super();
    this._id = id ? id : v4();
    this._product = product;
    this._unit_cost = product.cost;
    this._unit_price = product.price;
    this._quantity = quantity;
    this._subtotal_cost = quantity * product.cost;
    this._subtotal_price = quantity * product.price;
    this._barcode = product.barcode ? product.barcode : undefined;
    this._created_at = new Date();
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get product(): Product {
    return this._product;
  }

  get barcode(): number | null {
    return this._barcode ? this._barcode : null;
  }

  get unitCost(): number {
    return this._unit_cost;
  }

  get unitprice(): number {
    return this._unit_price;
  }

  get quantity(): number {
    return this._quantity; 123
  }

  get subtotalCost(): number {
    return this._subtotal_cost;
  }

  get subtotalPrice(): number {
    return this._subtotal_price;
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

  get show(): IOutputStockEntity {
    return {
      barcode: this._barcode,
      description: this._product.name,
      unit_price: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this._unit_price),
      quantity: this._quantity,
      subtotal: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this._subtotal_price)
    }
  }

  validate() {
    StockValidatorFactory.create().validate(this);
  }
}