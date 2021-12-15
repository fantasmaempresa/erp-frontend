import { EntityModel } from '../../core/interfaces/EntityModel';

export interface Document extends EntityModel {
  name: string;
  description: string;
  quote: string;
}
