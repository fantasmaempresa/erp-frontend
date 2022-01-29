import { EntityModel } from '../../core/interfaces/EntityModel';

export interface NotificationResponse extends EntityModel {
  notification: Notification;
  check: number;
  user_id: null;
  role_id: number;
}
