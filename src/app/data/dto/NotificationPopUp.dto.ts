import { NotificationDto } from './Notification.dto';

export interface NotificationPopUpDto extends NotificationDto {
  isClose: boolean;
}
