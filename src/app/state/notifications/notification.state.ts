import { Pagination } from '../../core/interfaces/Pagination.model';
import { NotificationModel } from '../../data/models/Notification.model';
import { NotificationPopUpModel } from '../../data/models/NotificationPopUp.model';

export interface NotificationState {
  notifications: Pagination<NotificationModel> | null;
  incomingNotifications: NotificationModel[];
  showNotifications: NotificationPopUpModel[];
}

export const initialState: NotificationState = {
  notifications: null,
  incomingNotifications: [
    // { notification: { type: 1, message: 'Prueba de Notificacion 1' }, isClose: false, id: 1 },
    // { notification: { type: 1, message: 'Prueba de Notificacion 2' }, isClose: false, id: 2 },
    // { notification: { type: 1, message: 'Prueba de Notificacion 3' }, isClose: false, id: 3 },
    // { notification: { type: 1, message: 'Prueba de Notificacion 4' }, isClose: false, id: 4 },
    // { notification: { type: 1, message: 'Prueba de Notificacion 5' }, isClose: false, id: 5 },
  ],
  showNotifications: [],
};
