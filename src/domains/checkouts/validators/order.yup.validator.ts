import ValidatorInterface from "@domains/@shared/validator/validator.interface";
import * as yup from "yup";
import Order from "../entities/order";
import OrderItem from "../entities/order_item";


export default class OrderYupValidator
  implements ValidatorInterface<Order> {
  validate(entity: Order): void {
    try {
      yup
        .object()
        .shape({
          items: yup.array<OrderItem[]>().min(1)
        })
        .validateSync({
          items: entity.items,
        }, {
          abortEarly: false,
        });
    }
    catch (errors) {
      const err = errors as yup.ValidationError;
      err.errors.forEach((error) => {
        entity.notification.addError({
          context: "order",
          message: error,
        })
      });
    }
  }

}