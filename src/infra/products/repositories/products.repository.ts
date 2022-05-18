import Product from "@domains/products/entities/product";
import ProductsRepositoryInterface from "@domains/products/repositories/products.repository.interface";
import { prisma } from "@infra/database/prisma.client";

export default class ProductsRepository implements ProductsRepositoryInterface {
  async create(newProduct: Product): Promise<void> {
    const { id, barcode, name, cost, price, product } = newProduct;
    await prisma.products.create({
      data: {
        id,
        name,
        cost,
        price,
        product,
        barcode,
      },
    });
  }
  async update(newProduct: Product): Promise<void> {
    const { id, barcode, name, cost, price, product } = newProduct;
    await prisma.products.update({
      where: {
        id,
      },
      data: {
        name,
        cost,
        price,
        product,
        barcode,
      },
    });
  }
  async find(id: string): Promise<Product | null> {
    const productFound = await prisma.products.findUnique({
      where: { id },
      include: {
        Popsicles: true,
      },
    });
    if (!productFound) {
      return null;
    }
    const { product, name, barcode, cost, price } = productFound;
    return new Product({
      id,
      name,
      product,
      cost,
      price,
      barcode,
    });
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.products.findMany();
    return products.map((productMap) => {
      const { product, name, barcode, cost, price, id } = productMap;
      return new Product({
        id,
        name,
        product,
        cost,
        price,
        barcode,
      });
    });
  }
}
