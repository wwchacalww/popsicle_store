import ValidatorInterface from "@domains/@shared/validator/validator.interface";
import Stock from "../entities/stock";
import StockYupValidator from "../validators/stock.yup.validator";

export default class StockValidatorFactory {
  static create(): ValidatorInterface<Stock> {
    return new StockYupValidator();
  }
}