import ValidatorInterface from "@domains/@shared/validator/validator.interface";
import * as yup from "yup";
import OrderItem from "../entities/order_item";


export default class OrderItemYupValidator
  implements ValidatorInterface<OrderItem> {
  validate(entity: OrderItem): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().required("Name is required"),
          quantity: yup.number()
            .moreThan(0, "Quantity must be greater than zero"),
          price: yup.number()
            .moreThan(0, "Price must be greater than zero"),
          product_id: yup.string().required("Product ID is required"),
        })
        .validateSync({
          name: entity.name,
          quantity: entity.quantity,
          price: entity.price,
          product_id: entity.product_id,
        }, {
          abortEarly: false,
        });
    }
    catch (errors) {
      const err = errors as yup.ValidationError;
      err.errors.forEach((error) => {
        entity.notification.addError({
          context: "order_item",
          message: error,
        })
      });
    }
  }

}