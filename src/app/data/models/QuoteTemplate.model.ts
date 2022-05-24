import { Formfield } from './Formfield.model';
import { EntityModel } from '../../core/interfaces/EntityModel';

export interface QuoteTemplate extends EntityModel {
  name: string;
  form: Formfield<any>[];
  operations?: any;
}
