import { Pagination } from '../../core/interfaces/Pagination.model';
import { NotificationDto } from '../../data/dto/Notification.dto';
import { NotificationPopUpDto } from '../../data/dto/NotificationPopUp.dto';

export interface NotificationState {
  notifications: Pagination<NotificationDto> | null;
  incomingNotifications: NotificationPopUpDto[];
}

export const initialState: NotificationState = {
  notifications: null,
  incomingNotifications: [],
};
