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
    { notification: { type: 1, message: 'Prueba de Notificacion 1' }, isClose: false, id: 1 },
    { notification: { type: 1, message: 'Prueba de Notificacion 2' }, isClose: false, id: 2 },
    { notification: { type: 1, message: 'Prueba de Notificacion 3' }, isClose: false, id: 3 },
    { notification: { type: 1, message: 'Prueba de Notificacion 4' }, isClose: false, id: 4 },
    { notification: { type: 1, message: 'Prueba de Notificacion 5' }, isClose: false, id: 5 },
    { notification: { type: 1, message: 'Prueba de Notificacion 6' }, isClose: false, id: 6 },
    { notification: { type: 1, message: 'Prueba de Notificacion 7' }, isClose: false, id: 7 },
    { notification: { type: 1, message: 'Prueba de Notificacion 8' }, isClose: false, id: 8 },
    { notification: { type: 1, message: 'Prueba de Notificacion 9' }, isClose: false, id: 9 },
    { notification: { type: 1, message: 'Prueba de Notificacion 10' }, isClose: false, id: 10 },
    { notification: { type: 1, message: 'Prueba de Notificacion 11' }, isClose: false, id: 11 },
  ],
};
