import { Pagination } from '../../core/interfaces/Pagination.model';
import { NotificationModel } from '../../data/models/Notification.model';

export interface NotificationState {
  notifications: Pagination<NotificationModel> | null;
  incomingNotifications: NotificationModel[];
}

export const initialState: NotificationState = {
  notifications: null,
  incomingNotifications: [],
};
