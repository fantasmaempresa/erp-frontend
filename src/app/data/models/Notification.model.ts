import { EntityModel } from '../../core/interfaces/EntityModel';

export interface NotificationModel extends EntityModel {
  notification: {
    title: string;
    type: number;
    message: string;
  };
  check: boolean;
}
