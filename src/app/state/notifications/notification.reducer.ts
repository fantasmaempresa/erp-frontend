import { Action, createReducer, on } from '@ngrx/store';
import { initialState, NotificationState } from './notification.state';
import * as NotificationActions from './notification.actions';

const NotificationReducer = createReducer(
  initialState,
  on(NotificationActions.loadNotifications, (state): NotificationState => state),
  on(NotificationActions.nothingNotification, (state): NotificationState => state),
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
  on(NotificationActions.addIncomingNotification, (state: NotificationState, { notification }) => {
    return {
      ...state,
      incomingNotifications: [...state.incomingNotifications, notification],
    };
  }),
  on(
    NotificationActions.showIncomingNotification,
    (state: NotificationState, { notifications }) => {
      return {
        ...state,
        showNotifications: [...notifications],
      };
    },
  ),
  on(NotificationActions.closeShowNotification, (state: NotificationState, { id }) => {
    return {
      ...state,
      showNotifications: [
        ...state.showNotifications.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                isClose: true,
              }
            : notification,
        ),
      ],
    };
  }),
  on(NotificationActions.deleteShowNotifications, (state: NotificationState) => {
    return {
      ...state,
      incomingNotifications: [],
    };
  }),
);

export function notificationReducer(state = initialState, action: Action) {
  return NotificationReducer(state, action);
}
