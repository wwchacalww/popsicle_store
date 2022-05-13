import ValidatorInterface from "../../@shared/validator/validator.interface";
import Popsicle from "../entities/popsicle";
import * as yup from "yup";


export default class PopsicleYupValidator implements ValidatorInterface<Popsicle> {
  validate(entity: Popsicle): void {
    try {
      yup
        .object()
        .shape({
          taste: yup.string().required("Taste is required"),
          category: yup.string().required("Category is required"),
          product_id: yup.string().required("Product ID is required"),
          cost: yup.number()
            .moreThan(0, "Cost must be greater than zero"),
          price: yup.number()
            .moreThan(0, "Price must be greater than zero"),
        })
        .validateSync({
          taste: entity.taste,
          category: entity.category,
          cost: entity.cost,
          product_id: entity.product_id,
          price: entity.price,
        }, {
          abortEarly: false,
        });
    }
    catch (errors) {
      const err = errors as yup.ValidationError;
      err.errors.forEach((error) => {
        entity.notification.addError({
          context: "popsicle",
          message: error,
        })
      });
    }
  }

}