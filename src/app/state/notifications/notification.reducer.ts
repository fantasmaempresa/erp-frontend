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
  on(NotificationActions.incomingNotification, (state: NotificationState, { notification }) => {
    return {
      ...state,
      incomingNotifications: [...state.incomingNotifications, notification],
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
