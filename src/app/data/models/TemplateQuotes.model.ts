import { EntityModel } from '../../core/interfaces/EntityModel';
import { Formfield } from './Formfield.model';

export interface TemplateQuotes extends EntityModel {
  name: string;
  form: Formfield<any>[];
}
