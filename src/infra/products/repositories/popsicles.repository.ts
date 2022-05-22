import Popsicle from "@domains/products/entities/popsicle";
import ProductFactory from "@domains/products/factories/product.factory";
import PopsiclesRepositoryInterface from "@domains/products/repositories/popsicles.repository.interface";
import { prisma } from "@infra/database/prisma.client";

export default class PopsiclesRepository
  implements PopsiclesRepositoryInterface
{
  async create(popsicle: Popsicle): Promise<void> {
    const { id, taste, category, cost, price, barcode } = popsicle;
    await prisma.popsicles.create({
      data: {
        id,
        taste,
        cost,
        category,
        price,
        barcode,
        productsId: popsicle.Product.id,
      },
    });
  }

  async update(popsicle: Popsicle): Promise<void> {
    const { id, taste, category, cost, price, barcode } = popsicle;
    await prisma.popsicles.update({
      where: {
        id,
      },
      data: {
        taste,
        category,
        cost,
        price,
        barcode,
      },
    });
  }

  async find(id: string): Promise<Popsicle> {
    const popsicleFound = await prisma.popsicles.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });
    const { taste, category, cost, price, barcode, product } = popsicleFound;

    return ProductFactory.createPopsicle({
      taste,
      category,
      cost,
      price,
      barcode,
      product_id: product.id,
      popsicle_id: id,
    });
  }
  async findAll(): Promise<Popsicle[]> {
    const popscicles = await prisma.popsicles.findMany();
    return popscicles.map((popsicle) => {
      const { id, taste, category, cost, price, barcode, productsId } =
        popsicle;
      return ProductFactory.createPopsicle({
        taste,
        category,
        cost,
        price,
        barcode,
        product_id: productsId,
        popsicle_id: id,
      });
    });
  }

  async delete(id: string): Promise<void> {
    const product = await prisma.popsicles.delete({
      where: { id },
      select: {
        productsId: true,
      },
    });
    await prisma.products.delete({
      where: { id: product.productsId },
    });
  }
}
