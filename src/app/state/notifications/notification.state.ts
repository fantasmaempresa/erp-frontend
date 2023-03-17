import { Pagination } from '../../core/interfaces';
import { NotificationDto, NotificationPopUpDto } from '../../data/dto';

export interface NotificationState {
  notifications: Pagination<NotificationDto> | null;
  incomingNotifications: NotificationPopUpDto[];
}

export const initialState: NotificationState = {
  notifications: null,
  incomingNotifications: [],
};
