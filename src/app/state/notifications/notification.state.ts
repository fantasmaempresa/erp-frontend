import { Pagination } from '../../core/interfaces/Pagination.model';
import { NotificationModel } from '../../data/models/Notification.model';
import { NotificationPopUpModel } from '../../data/models/NotificationPopUp.model';

export interface NotificationState {
  notifications: Pagination<NotificationModel> | null;
  incomingNotifications: NotificationPopUpModel[];
}

export const initialState: NotificationState = {
  notifications: null,
  incomingNotifications: [
    // { notification: { type: 1, message: 'Prueba de Notificacion' }, isClose: false, id: 1 },
  ],
};
