import { container } from "tsyringe";
import ProductsRepositoryInterface from "@domains/products/repositories/products.repository.interface";
import ProductsRepository from "../products/repositories/products.repository";
import PopsiclesRepositoryInterface from "@domains/products/repositories/popsicles.repository.interface";
import PopsiclesRepository from "../products/repositories/popsicles.repository";

container.registerSingleton<ProductsRepositoryInterface>(
  "ProductsRepository",
  ProductsRepository
);

container.registerSingleton<PopsiclesRepositoryInterface>(
  "PopsiclesRepository",
  PopsiclesRepository
);
