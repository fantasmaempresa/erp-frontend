import { EntityDto } from 'o2c_core';

export interface NotificationDto extends EntityDto {
  notification: {
    title: string;
    type: number;
    message: string;
  };
  check: boolean;
}
