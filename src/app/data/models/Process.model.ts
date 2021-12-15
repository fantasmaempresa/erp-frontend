import { EntityModel } from '../../core/interfaces/EntityModel';

export interface Process extends EntityModel {
  name: string;
  config: string;
}
