import Popsicle from "@domains/products/entities/popsicle";
import PopsiclesRepositoryInterface from "@domains/products/repositories/popsicles.repository.interface";
import { prisma } from "@infra/database/prisma.client";

export default class PopsiclesRepository
  implements PopsiclesRepositoryInterface
{
  async create(popsicle: Popsicle): Promise<void> {
    const { id, taste, category, cost, price, barcode, product_id } = popsicle;
    await prisma.popsicles.create({
      data: {
        id,
        taste,
        cost,
        category,
        price,
        barcode,
        productsId: product_id,
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
    });
    const { taste, category, cost, price, productsId, barcode } = popsicleFound;
    return new Popsicle({
      id,
      taste,
      category,
      cost,
      price,
      product_id: productsId,
      barcode,
    });
  }
  async findAll(): Promise<Popsicle[]> {
    const popscicles = await prisma.popsicles.findMany();
    return popscicles.map((popsicle) => {
      const { id, taste, category, cost, price, productsId, barcode } =
        popsicle;
      return new Popsicle({
        id,
        taste,
        category,
        cost,
        price,
        product_id: productsId,
        barcode,
      });
    });
  }
}
