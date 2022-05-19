import Product from "../entities/product";

export default interface ProductsRepositoryInterface {
  create(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  find(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  delete(id: string): Promise<void>;
}
