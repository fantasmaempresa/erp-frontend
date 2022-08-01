import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface NotificationResponseDto extends EntityDto {
  notification: Notification;
  check: number;
  user_id: null;
  role_id: number;
}
