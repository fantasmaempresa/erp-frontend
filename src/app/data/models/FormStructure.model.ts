import { EntityModel } from '../../core/interfaces/EntityModel';
import { Formfield } from './Formfield.model';

export interface FormStructure extends EntityModel {
  name: string;
  description: string;
  form: Formfield<any>[];
  operations?: any;
}
