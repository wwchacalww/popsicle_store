import NotificationError from "../notifications/notification.error";
import Notification from "../notifications/notification";
import ValueObject from "./value-object";

export default class BarcodeType extends ValueObject<string> {
  constructor(readonly barcode: string) {
    super(barcode);
    this.validate();
  }

  private validate() {
    const regex = /\W/;
    if (
      typeof this._value !== "string" ||
      this._value.length < 5 ||
      this._value.length > 25 ||
      regex.test(this._value)
    ) {
      const notification = new Notification();
      notification.addError({
        context: "barcode",
        message: "Barcode invalid",
      });
      throw new NotificationError(notification.getErrors());
    }
  }
}
