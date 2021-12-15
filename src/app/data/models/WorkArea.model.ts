import { EntityModel } from '../../core/interfaces/EntityModel';

export interface WorkArea extends EntityModel {
  name: string;
  description: string;
  config: object;
}
