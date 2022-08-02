import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface NotificationDto extends EntityDto {
  notification: {
    title: string;
    type: number;
    message: string;
  };
  check: boolean;
}
