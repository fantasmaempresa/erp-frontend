import { EntityModel } from '../../core/interfaces/EntityModel';

export interface PhasesProcess extends EntityModel {
  name: string;
  description: string;
  form: string;
  quotes: string;
  payments: string;
}
