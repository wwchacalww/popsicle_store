import Entity from "@domains/@shared/entity/entity.abstract";


export default class Checkout extends Entity {
  private _name: string;
  private _price: number;
  private _productId: string;
  private _quantity: number;
}