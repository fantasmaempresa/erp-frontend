import { EntityModel } from '../../core/interfaces/EntityModel';

export interface NotificationModel extends EntityModel {
  notification: {
    type: number;
    message: string;
  };
  check: boolean;
}
