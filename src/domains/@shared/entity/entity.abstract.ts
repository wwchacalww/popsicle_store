import { v4 } from "uuid";
import Notification from "../notifications/notification";

export default abstract class Entity {
  protected _id: string;
  public notification: Notification;

  constructor(id?: string) {
    this._id = id || v4();
    this.notification = new Notification();
  }

  get id(): string {
    return this._id;
  }
}
