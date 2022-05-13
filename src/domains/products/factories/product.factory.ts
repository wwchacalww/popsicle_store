import Popsicle from "../entities/popsicle";
import Product from "../entities/product";

interface OutputPopsicleFactoryCreate {
  product: {
    id: string,
    name: string,
    product: string,
    cost: number,
    price: number,
    barcode?: number,
  },
  popsicle: {
    taste: string,
    category: string,
  }
}

export default class ProductFactory {
  public static createPopsicle(
    taste: string,
    category: string,
    cost: number,
    price: number,
    barcode?: number,
  ): OutputPopsicleFactoryCreate {
    const product = new Product({
      name: `Picolé de ${taste} - ${category}`,
      product: "popsicle",
      cost,
      price,
      barcode,
    }
    );
    const popsicle = new Popsicle(
      taste,
      category,
      cost,
      price,
      product.id,
      barcode
    );

    return {
      product: {
        id: product.id,
        product: "popsicle",
        name: product.name,
        cost: product.cost,
        price: product.price,
        barcode: product.barcode ? product.barcode : undefined
      },
      popsicle: {
        taste: popsicle.taste,
        category: popsicle.category,
      }
    }
  }
}