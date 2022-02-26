import { NotificationModel } from './Notification.model';

export interface NotificationPopUpModel extends NotificationModel {
  isClose: boolean;
}
