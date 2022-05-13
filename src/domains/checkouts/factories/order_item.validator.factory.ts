import ValidatorInterface from "@domains/@shared/validator/validator.interface";
import OrderItem from "../entities/order_item";
import OrderItemYupValidator from "../validators/order_item.yup.validator";

export default class OrderItemValidatorFactory {
  static create(): ValidatorInterface<OrderItem> {
    return new OrderItemYupValidator();
  }
}