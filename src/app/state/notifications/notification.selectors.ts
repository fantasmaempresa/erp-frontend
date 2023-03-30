import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationState } from './notification.state';

const selectNotificationState =
  createFeatureSelector<NotificationState>('notifications');

export const selectNotification = createSelector(
  selectNotificationState,
  (state) => {
    return state.notifications;
  },
);

export const selectLastNotification = createSelector(
  selectNotificationState,
  (state) => {
    return state.notifications ? state.notifications.data.slice(0, 25) : [];
  },
);

export const selectIncomingNotifications = createSelector(
  selectNotificationState,
  (state) => {
    return state.incomingNotifications;
  },
);

export const selectNumberOfNotifications = createSelector(
  selectNotificationState,
  (state) =>
    state.notifications
      ? state.notifications.data
          .slice(0, 25)
          .filter((notification) => !notification.check).length
      : 0,
);

export const selectUnreadNotifications = createSelector(
  selectNotificationState,
  (state) => {
    return state.notifications?.data
      .slice(0, 25)
      .filter((notification) => !notification.check);
  },
);
