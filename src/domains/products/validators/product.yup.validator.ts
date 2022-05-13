import ValidatorInterface from "@domains/@shared/validator/validator.interface";
import * as yup from "yup";
import Product from "../entities/product";


export default class ProductYupValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().required("Name is required"),
          product: yup.string().required("Product is required"),
          cost: yup.number()
            .moreThan(0, "Cost must be greater than zero"),
          price: yup.number()
            .moreThan(0, "Price must be greater than zero"),
        })
        .validateSync({
          name: entity.name,
          product: entity.product,
          cost: entity.cost,
          price: entity.price,
        }, {
          abortEarly: false,
        });
    }
    catch (errors) {
      const err = errors as yup.ValidationError;
      err.errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        })
      });
    }
  }

}