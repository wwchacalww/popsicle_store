import ValidatorInterface from "@domains/@shared/validator/validator.interface";
import Product from "../entities/product";
import ProductYupValidator from "../validators/product.yup.validator";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductYupValidator();
  }
}