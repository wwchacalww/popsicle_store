import Product from "@domains/products/entities/product";
import ProductsRepository from "../products.repository";

const productsRepository = new ProductsRepository();

describe("Product Repository Integration Test", () => {
  it("should create, find and delete a product", async () => {
    const product = new Product({
      name: "Picole sabor Manga - Comum",
      product: "popsicle",
      cost: 1.5,
      price: 3,
      barcode: "1029834324092",
    });
    await productsRepository.create(product);
    let productFound = await productsRepository.find(product.id);
    expect(product.id).toBe(productFound.id);
    expect(product.name).toBe(productFound.name);
    expect(product.product).toBe(productFound.product);
    expect(product.cost).toBe(productFound.cost);
    expect(product.price).toBe(productFound.price);
    await productsRepository.delete(product.id);
    productFound = await productsRepository.find(product.id);
    expect(productFound).toBeNull();
  });

  it("should update a product", async () => {
    const product = new Product({
      name: "Picolé sabor Manga - Comum",
      product: "popsicle",
      cost: 1.5,
      price: 3,
      barcode: "1029834324092",
    });
    await productsRepository.create(product);

    const productUpdated = new Product({
      id: product.id,
      name: "Picolé sabor Limão - Premium",
      product: product.product,
      cost: 0.85,
      price: 2.5,
      barcode: "1234567890",
    });
    await productsRepository.update(productUpdated);
    const productFound = await productsRepository.find(product.id);
    expect(productUpdated.id).toBe(productFound.id);
    expect(productUpdated.name).toBe(productFound.name);
    expect(productUpdated.product).toBe(productFound.product);
    expect(productUpdated.cost).toBe(productFound.cost);
    expect(productUpdated.price).toBe(productFound.price);
    await productsRepository.delete(productUpdated.id);
  });

  it("should find all products", async () => {
    const product1 = new Product({
      name: "Picolé sabor Manga - Comum",
      product: "popsicle",
      cost: 1.5,
      price: 3,
      barcode: "65165151315315",
    });

    const product2 = new Product({
      name: "Picolé sabor Limão - Comum",
      product: "popsicle",
      cost: 1.5,
      price: 3,
      barcode: "1312546515168",
    });

    const product3 = new Product({
      name: "Picolé sabor Cajamanga - Premium",
      product: "popsicle",
      cost: 1.5,
      price: 3,
      barcode: "1029834092834",
    });
    await productsRepository.create(product1);
    await productsRepository.create(product2);
    await productsRepository.create(product3);

    const list = await productsRepository.findAll();
    expect(list.length).toBe(3);
    await productsRepository.delete(product1.id);
    await productsRepository.delete(product2.id);
    await productsRepository.delete(product3.id);
  });
});
