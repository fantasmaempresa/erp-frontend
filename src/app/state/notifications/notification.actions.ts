import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { NotificationModel } from '../../data/models/Notification.model';

export enum NotificationActions {
  LOAD_NOTIFICATION = '[Notification] Load notifications',
  LOAD_NOTIFICATION_SUCCESS = '[Notification] Load notifications success',
  LOAD_NEXT_PAGE = '[Notification] Load next page',
  EMPTY_NOTIFICATION_LIST = '[Notification] Empty notification list',
  INCOMING_NOTIFICATION = '[Notification] Incoming',
  DELETE_INCOMING_NOTIFICATION = '[Notification] Delete from notification area',
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
export const incomingNotification = createAction(
  NotificationActions.INCOMING_NOTIFICATION,
  props<{ notification: NotificationModel }>(),
);
export const deleteIncomingNotification = createAction(
  NotificationActions.DELETE_INCOMING_NOTIFICATION,
  props<{ id: number }>(),
);
