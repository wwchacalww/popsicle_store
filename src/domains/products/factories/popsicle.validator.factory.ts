import ValidatorInterface from "@domains/@shared/validator/validator.interface";
import Popsicle from "../entities/popsicle";
import PopsicleYupValidator from "../validators/popsicle.yup.validator";

export default class PopsicleValidatorFactory {
  static create(): ValidatorInterface<Popsicle> {
    return new PopsicleYupValidator();
  }
}