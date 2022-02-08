import { NotificationModel } from './Notification.model';

export interface NotificationPopUpModel extends NotificationModel {
  notification: {
    type: number;
    message: string;
  };
  isClose: boolean;
}
