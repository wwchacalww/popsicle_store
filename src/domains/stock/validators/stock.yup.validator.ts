import ValidatorInterface from "@domains/@shared/validator/validator.interface";
import Product from "@domains/products/entities/product";
import * as yup from "yup";
import Stock from "../entities/stock";


export default class StockYupValidator
  implements ValidatorInterface<Stock> {
  validate(entity: Stock): void {
    try {
      yup
        .object()
        .shape({
          cost: yup.number()
            .moreThan(0, "Cost must be greater than zero")
            .defined("Cost do not be equal zero"),
          price: yup.number()
            .moreThan(0, "Price must be greater than zero")
            .defined("Price do not be equal zero"),
          quantity: yup.number()
            .not([0], "Quantity do not be equal zero"),
        })
        .validateSync({
          cost: entity.unitCost,
          price: entity.unitprice,
          quantity: entity.quantity,
        }, {
          abortEarly: false,
        });
    }
    catch (errors) {
      const err = errors as yup.ValidationError;
      err.errors.forEach((error) => {
        entity.notification.addError({
          context: "stock",
          message: error,
        })
      });
    }
  }

}