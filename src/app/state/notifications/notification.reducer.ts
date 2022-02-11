import { Action, createReducer, on } from '@ngrx/store';
import { initialState, NotificationState } from './notification.state';
import * as NotificationActions from './notification.actions';

const NotificationReducer = createReducer(
  initialState,
  on(NotificationActions.loadNotifications, (state): NotificationState => state),
  on(
    NotificationActions.loadNotificationsSuccess,
    (state: NotificationState, { notifications }) => {
      return {
        ...state,
        notifications,
      };
    },
  ),
  on(NotificationActions.emptyNotificationList, () => {
    return initialState;
  }),
  on(NotificationActions.incomingNotification, (state: NotificationState, { notifications }) => {
    return {
      ...state,
      incomingNotifications: notifications.map((notification) => {
        return {
          ...notification,
          isClose: false,
        };
      }),
    };
  }),
  on(NotificationActions.closeIncomingNotification, (state: NotificationState, { id }) => {
    return {
      ...state,
      incomingNotifications: state.incomingNotifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              isClose: true,
            }
          : notification,
      ),
    };
  }),
  on(NotificationActions.deleteIncomingNotification, (state: NotificationState, { id }) => {
    return {
      ...state,
      incomingNotifications: state.incomingNotifications.filter(
        (notification) => notification.id !== id,
      ),
    };
  }),
);

export function notificationReducer(state = initialState, action: Action) {
  return NotificationReducer(state, action);
}
