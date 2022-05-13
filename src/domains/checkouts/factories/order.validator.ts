import ValidatorInterface from "@domains/@shared/validator/validator.interface";
import Order from "../entities/order";
import OrderYupValidator from "../validators/order.yup.validator";

export default class OrderValidatorFactory {
  static create(): ValidatorInterface<Order> {
    return new OrderYupValidator();
  }
}