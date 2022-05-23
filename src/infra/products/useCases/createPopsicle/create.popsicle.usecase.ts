import { inject, injectable } from "tsyringe";
import PopsiclesRepositoryInterface from "@domains/products/repositories/popsicles.repository.interface";
import {
  InputCreatePopsicleDTO,
  OutputCreatePopsicleDTO,
} from "./create.popsicle.dto";
import ProductFactory from "@domains/products/factories/product.factory";
import ProductsRepositoryInterface from "@domains/products/repositories/products.repository.interface";
import Notification from "@domains/@shared/notifications/notification";
import NotificationError from "@domains/@shared/notifications/notification.error";

@injectable()
export default class CreatePopsicleUseCase {
  constructor(
    @inject("PopsiclesRepository")
    private popsiclesRepository: PopsiclesRepositoryInterface,
    @inject("ProductsRepository")
    private productsRepository: ProductsRepositoryInterface
  ) {}

  async execute(
    input: InputCreatePopsicleDTO
  ): Promise<OutputCreatePopsicleDTO> {
    const { taste, category, cost, price, barcode } = input;
    const popsicle = ProductFactory.createPopsicle({
      taste,
      category,
      cost,
      price,
      barcode,
    });
    await this.productsRepository.create(popsicle.Product);
    await this.popsiclesRepository.create(popsicle);
    const popsicleFound = await this.popsiclesRepository.find(popsicle.id);
    if (!popsicleFound) {
      const notification = new Notification();
      notification.addError({
        context: "popsicle",
        message: "Popsicle not created",
      });
      throw new NotificationError(notification.getErrors());
    }
    return {
      id: popsicleFound.id,
      taste: popsicle.taste,
      category: popsicle.category,
      cost: popsicle.cost,
      price: popsicle.price,
      barcode: popsicle.barcode,
      Product: {
        id: popsicle.Product.id,
        name: popsicle.Product.name,
        product: popsicle.Product.product,
      },
    };
  }
}
