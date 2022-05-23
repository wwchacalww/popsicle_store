import "@infra/container";
import PopsiclesRepository from "@infra/products/repositories/popsicles.repository";
import ProductsRepository from "@infra/products/repositories/products.repository";
import { container } from "tsyringe";
import CreatePopsicleUseCase from "./create.popsicle.usecase";

let popsiclesRepository: PopsiclesRepository;
let productsRepository: ProductsRepository;
let createPopsicleUseCase: CreatePopsicleUseCase;

describe("Use case CreatePopsicle Test", () => {
  beforeEach(() => {
    popsiclesRepository = new PopsiclesRepository();
    productsRepository = new ProductsRepository();
    createPopsicleUseCase = container.resolve(CreatePopsicleUseCase);
  });

  test("Create a product popsicle", async () => {
    const popsicle = await createPopsicleUseCase.execute({
      taste: "Limão",
      category: "Comum",
      cost: 2.2,
      price: 3.4,
      barcode: BigInt(123456789),
    });
    expect(popsicle.taste).toBe("Limão");
    expect(popsicle.price).toBe(3.4);
    expect(popsicle.Product.id).toBeDefined();
    expect(popsicle.barcode).toBe(BigInt(123456789));
  });
});
