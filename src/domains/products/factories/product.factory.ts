import Popsicle from "../entities/popsicle";
import Product from "../entities/product";

interface OutputPopsicleFactoryCreate {
  product: {
    id: string;
    name: string;
    product: string;
    cost: number;
    price: number;
    barcode?: bigint;
  };
  popsicle: {
    taste: string;
    category: string;
  };
}

interface InputPopsicleProductCreate {
  taste: string;
  category: string;
  cost: number;
  price: number;
  barcode?: bigint;
}

export default class ProductFactory {
  public static createPopsicle(
    props: InputPopsicleProductCreate
  ): OutputPopsicleFactoryCreate {
    const { taste, category, cost, price, barcode } = props;
    const product = new Product({
      name: `Picolé de ${taste} - ${category}`,
      product: "popsicle",
      cost,
      price,
      barcode,
    });
    const popsicle = new Popsicle({
      taste,
      category,
      cost,
      price,
      product_id: product.id,
      barcode,
    });

    return {
      product: {
        id: product.id,
        product: "popsicle",
        name: product.name,
        cost: product.cost,
        price: product.price,
        barcode,
      },
      popsicle: {
        taste: popsicle.taste,
        category: popsicle.category,
      },
    };
  }
}
