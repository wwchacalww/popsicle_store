import Product from "@domains/products/entities/product";
import ProductsRepository from "../products.repository";

const productsRepository = new ProductsRepository();

describe("Product Repository Unit Test", () => {
  it("should create, find and delete a product", async () => {
    const product = new Product({
      name: "Picolé sabor Manga - Comum",
      product: "popsicle",
      cost: 1.5,
      price: 3,
      barcode: BigInt(1029834324092),
    });
    await productsRepository.create(product);
    let productFound = await productsRepository.find(product.id);
    expect(productFound).toStrictEqual(product);
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
      barcode: BigInt(1029834324092),
    });
    await productsRepository.create(product);

    const productUpdated = new Product({
      id: product.id,
      name: "Picolé sabor Limão - Premium",
      product: product.product,
      cost: 0.85,
      price: 2.5,
      barcode: BigInt(1234567890),
    });
    await productsRepository.update(productUpdated);
    const productFound = await productsRepository.find(product.id);
    expect(productFound).toStrictEqual(productUpdated);
    await productsRepository.delete(product.id);
  });

  it("should find all products", async () => {
    const product1 = new Product({
      name: "Picolé sabor Manga - Comum",
      product: "popsicle",
      cost: 1.5,
      price: 3,
      barcode: BigInt(65165151315315),
    });

    const product2 = new Product({
      name: "Picolé sabor Limão - Comum",
      product: "popsicle",
      cost: 1.5,
      price: 3,
      barcode: BigInt(1312546515168),
    });

    const product3 = new Product({
      name: "Picolé sabor Cajamanga - Premium",
      product: "popsicle",
      cost: 1.5,
      price: 3,
      barcode: BigInt(1029834092834),
    });
    await productsRepository.create(product1);
    await productsRepository.create(product2);
    await productsRepository.create(product3);

    const list = await productsRepository.findAll();
    expect(list).toStrictEqual([product1, product2, product3]);
    await productsRepository.delete(product1.id);
    await productsRepository.delete(product2.id);
    await productsRepository.delete(product3.id);
  });
});
