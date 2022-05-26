import Popsicle from "@domains/products/entities/popsicle";
import Product from "@domains/products/entities/product";
import PopsiclesRepository from "../popsicles.repository";
import ProductsRepository from "../products.repository";

const productsRepository = new ProductsRepository();
const popsicleRepository = new PopsiclesRepository();
describe("Popsicle repository integration test", () => {
  it("should create a popsicle", async () => {
    const product = new Product({
      name: "Picolé de Limão - Comum",
      product: "popsicle",
      cost: 1.5,
      price: 3,
      barcode: "2394098202",
    });
    const popsicle = new Popsicle({
      taste: "Limão",
      category: "Comum",
      cost: 1.5,
      price: 3,
      product,
      barcode: product.barcode,
    });
    await productsRepository.create(product);
    await popsicleRepository.create(popsicle);

    const popsicleFound = await popsicleRepository.find(popsicle.id);
    expect(popsicleFound.taste).toBe(popsicle.taste);
    expect(popsicleFound.category).toBe(popsicle.category);
    expect(popsicleFound.cost).toBe(popsicle.cost);
    expect(popsicleFound.price).toBe(popsicle.price);
    expect(popsicleFound.barcode).toBe(popsicle.barcode);
    await popsicleRepository.delete(popsicle.id);
  });
});
