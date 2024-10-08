import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces';
import { NotificationDto } from '../../data/dto';

export enum NotificationActions {
  LOAD_NOTIFICATION = '[Notification] Load notifications',
  LOAD_NOTIFICATION_SUCCESS = '[Notification] Load notifications success',
  LOAD_NEXT_PAGE = '[Notification] Load next page',
  EMPTY_NOTIFICATION_LIST = '[Notification] Empty notification list',
  INCOMING_NOTIFICATION = '[Notification] Incoming',
  ADD_INCOMING_NOTIFICATION = '[Notification] Add Incoming',
  CLOSE_INCOMING_NOTIFICATION = '[Notification] Close notification',
  DELETE_INCOMING_NOTIFICATION = '[Notification] Delete from notification area',
  LISTEN_NOTIFICATIONS = '[Notification] Start to listen for notifications',
  CURRENT_NOTIFICATIONS = '[Notification] Return current State',
  READ_NOTIFICATIONS = '[Notification] Read all notifications',
  READ_NOTIFICATIONS_SERVER = '[Notification] Read all notifications from server',
}

export const loadNotifications = createAction(
  NotificationActions.LOAD_NOTIFICATION,
);
export const loadNotificationsSuccess = createAction(
  NotificationActions.LOAD_NOTIFICATION_SUCCESS,
  props<{ notifications: Pagination<NotificationDto> }>(),
);
export const loadNextPageOfNotifications = createAction(
  NotificationActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);
export const emptyNotificationList = createAction(
  NotificationActions.EMPTY_NOTIFICATION_LIST,
);
export const incomingNotification = createAction(
  NotificationActions.INCOMING_NOTIFICATION,
  props<{ notifications: any[] }>(),
);

export const addIncomingNotification = createAction(
  NotificationActions.ADD_INCOMING_NOTIFICATION,
  props<{ notifications: NotificationDto[] }>(),
);

export const closeIncomingNotification = createAction(
  NotificationActions.CLOSE_INCOMING_NOTIFICATION,
  props<{ id: number }>(),
);
export const deleteIncomingNotification = createAction(
  NotificationActions.DELETE_INCOMING_NOTIFICATION,
  props<{ id: number }>(),
);

export const readAllNotifications = createAction(
  NotificationActions.READ_NOTIFICATIONS,
);
export const readAllNotificationsServer = createAction(
  NotificationActions.READ_NOTIFICATIONS_SERVER,
);
export const currentNotifications = createAction(
  NotificationActions.CURRENT_NOTIFICATIONS,
);
export const startListenNotification = createAction(
  NotificationActions.LISTEN_NOTIFICATIONS,
);
