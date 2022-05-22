import Popsicle from "../entities/popsicle";
import Product from "../entities/product";

interface InputPopsicleProductCreate {
  popsicle_id?: string;
  product_id?: string;
  taste: string;
  category: string;
  cost: number;
  price: number;
  barcode?: bigint;
}

export default class ProductFactory {
  public static createPopsicle(props: InputPopsicleProductCreate): Popsicle {
    const { taste, category, cost, price, barcode, popsicle_id, product_id } =
      props;
    const product = new Product({
      id: product_id,
      name: `Picolé de ${taste} - ${category}`,
      product: "popsicle",
      cost,
      price,
      barcode,
    });
    return new Popsicle({
      id: popsicle_id,
      taste,
      category,
      cost,
      price,
      product,
      barcode,
    });
  }
}
