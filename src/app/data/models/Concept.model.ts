import { EntityModel } from '../../core/interfaces/EntityModel';

export interface Concept extends EntityModel {
  name: string;
  description: string;
  formula: object;
  amount: number;
}
