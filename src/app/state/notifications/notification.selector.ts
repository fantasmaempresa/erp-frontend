import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationState } from './notification.state';

const selectNotificationState = createFeatureSelector<NotificationState>('notifications');

export const selectNotification = createSelector(selectNotificationState, (state) => {
  return state.notifications;
});

export const selectIncomingNotifications = createSelector(selectNotificationState, (state) => {
  return state.incomingNotifications;
});
