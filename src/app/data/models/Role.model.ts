import { EntityModel } from '../../core/interfaces/EntityModel';

export interface Role extends EntityModel {
  name: string;
  description: string;
  config: object;
}
