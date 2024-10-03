import { Pagination } from '../../core/interfaces';
import { NotificationDto, NotificationPopUpDto } from '../../data/dto';

export interface NotificationState {
  notifications: Pagination<NotificationDto> | null;
  incomingNotifications: {
    extra_info: [],
    role_id: number,
    user_id: number,
    notification: NotificationPopUpDto,
    isClose: boolean,
  }[];
}

export const initialState: NotificationState = {
  notifications: null,
  incomingNotifications: [],
};
