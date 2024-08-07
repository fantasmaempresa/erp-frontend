import { EntityDto } from 'o2c_core';

export interface NotificationResponseDto extends EntityDto {
  notification: Notification;
  check: number;
  user_id: null;
  role_id: number;
}
