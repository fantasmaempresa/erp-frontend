import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { NotificationModel } from '../../data/models/Notification.model';
import { NotificationPopUpModel } from '../../data/models/NotificationPopUp.model';

export enum NotificationActions {
  LOAD_NOTIFICATION = '[Notification] Load notifications',
  LOAD_NOTIFICATION_SUCCESS = '[Notification] Load notifications success',
  LOAD_NEXT_PAGE = '[Notification] Load next page',
  EMPTY_NOTIFICATION_LIST = '[Notification] Empty notification list',

  LISTEN_NOTIFICATIONS = '[Notification] Start to listen for notifications',

  INCOMING_NOTIFICATION = '[Notification] Incoming',
  NOTHING = '[Notification] NOTHING Incoming',
  ADD_INCOMING_NOTIFICATION = '[Notification] Add Incoming',
  SHOW_INCOMING_NOTIFICATION = '[Notification] Add Incoming to ShowNotification',
  CLOSE_SHOW_NOTIFICATION = '[Notification] Close show notification',
  CLEAR_SHOW_NOTIFICATION = '[Notification] Delete all notifications area',
}

export const loadNotifications = createAction(NotificationActions.LOAD_NOTIFICATION);
export const loadNotificationsSuccess = createAction(
  NotificationActions.LOAD_NOTIFICATION_SUCCESS,
  props<{ notifications: Pagination<NotificationModel> }>(),
);
export const loadNextPageOfNotifications = createAction(
  NotificationActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);
export const emptyNotificationList = createAction(NotificationActions.EMPTY_NOTIFICATION_LIST);
export const showIncomingNotification = createAction(
  NotificationActions.SHOW_INCOMING_NOTIFICATION,
  props<{ notifications: NotificationPopUpModel[] }>(),
);
export const incomingNotification = createAction(NotificationActions.INCOMING_NOTIFICATION);
export const addIncomingNotification = createAction(
  NotificationActions.ADD_INCOMING_NOTIFICATION,
  props<{ notification: NotificationModel }>(),
);
export const closeShowNotification = createAction(
  NotificationActions.CLOSE_SHOW_NOTIFICATION,
  props<{ id: number }>(),
);
export const deleteShowNotifications = createAction(NotificationActions.CLEAR_SHOW_NOTIFICATION);
export const startListenNotification = createAction(NotificationActions.LISTEN_NOTIFICATIONS);
export const nothingNotification = createAction(NotificationActions.NOTHING);
