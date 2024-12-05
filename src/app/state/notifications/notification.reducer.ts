import { Action, createReducer, on } from '@ngrx/store';
import { initialState, NotificationState } from './notification.state';
import * as NotificationActions from './notification.actions';

const NotificationReducer = createReducer(
  initialState,
  on(
    NotificationActions.loadNotifications,
    (state): NotificationState => state,
  ),
  on(
    NotificationActions.currentNotifications,
    (state): NotificationState => state,
  ),
  on(
    NotificationActions.startListenNotification,
    (state): NotificationState => state,
  ),
  on(
    NotificationActions.readAllNotificationsServer,
    (state): NotificationState => state,
  ),
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
  on(
    NotificationActions.incomingNotification,
    (state: NotificationState, { notifications }) => {
      return {
        ...state,
        incomingNotifications: notifications.map((notification) => {
          return {
            ...notification,
            notification: { ...notification.notification, isClose: false }
          };
        }),
      };
    },
  ),
  on(
    NotificationActions.addIncomingNotification,
    (state: NotificationState, { notifications }): NotificationState => {
      // console.log('NotificationActions.addIncomingNotification -->', notifications);
      let pushNotifications = notifications.map((notification) => notification.notification);

      return {
        ...state,
        // @ts-ignore
        notifications: {
          ...state.notifications,
          // @ts-ignore
          data: [
            ...pushNotifications,
            ...(state && state.notifications ? state.notifications.data : []),
          ],
        },
      };;
    },
  ),
  on(
    NotificationActions.closeIncomingNotification,
    (state: NotificationState, { id }) => {
      // console.log('NotificationActions.closeIncomingNotification --> ', state);
      return {
        ...state,
        incomingNotifications: state.incomingNotifications.map((notification) =>
          notification.notification.id === id
            ? {
              ...notification,
              notification: { ...notification.notification, isClose: true }
            }
            : notification,
        ),
      };
    },
  ),
  on(
    NotificationActions.deleteIncomingNotification,
    (state: NotificationState, { id }) => {
      console.log('NotificationActions.deleteIncomingNotification --> ', state);
      return {
        ...state,
        incomingNotifications: state.incomingNotifications.filter(
          (notification) => notification.notification.id !== id,
        ),
      };
    },
  ),
  on(
    NotificationActions.readAllNotifications,
    (state: NotificationState): NotificationState => {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          // @ts-ignore
          data: state.notifications?.data.map((notification) => ({
            ...notification,
            check: true,
          })),
        },
      };
    },
  ),
);

export function notificationReducer(state = initialState, action: Action) {
  return NotificationReducer(state, action);
}
