import { v4 } from "uuid";
import Notification from "../notifications/notification";

export default abstract class Entity {
  private _id: string;
  public notification: Notification;

  constructor() {
    this._id = v4();
    this.notification = new Notification();
  }

  get id(): string {
    return this._id;
  }
}