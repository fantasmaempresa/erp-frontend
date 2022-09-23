import { EntityDto } from '../../core/interfaces';

export interface NotificationDto extends EntityDto {
  notification: {
    title: string;
    type: number;
    message: string;
  };
  check: boolean;
}
