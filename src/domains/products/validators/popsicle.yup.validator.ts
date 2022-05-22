import ValidatorInterface from "../../@shared/validator/validator.interface";
import Popsicle from "../entities/popsicle";
import * as yup from "yup";

export default class PopsicleYupValidator
  implements ValidatorInterface<Popsicle>
{
  validate(entity: Popsicle): void {
    try {
      yup
        .object()
        .shape({
          taste: yup.string().required("Taste is required"),
          category: yup.string().required("Category is required"),
          cost: yup.number().moreThan(0, "Cost must be greater than zero"),
          price: yup.number().moreThan(0, "Price must be greater than zero"),
          product: yup
            .object({
              id: yup.string().required(),
              name: yup.string().required(),
              product: yup.string().required(),
              price: yup.number(),
              cost: yup.number(),
            })
            .required("Product is required"),
        })
        .validateSync(
          {
            taste: entity.taste,
            category: entity.category,
            cost: entity.cost,
            price: entity.price,
            product: entity.Product,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const err = errors as yup.ValidationError;
      err.errors.forEach((error) => {
        entity.notification.addError({
          context: "popsicle",
          message: error,
        });
      });
    }
  }
}
