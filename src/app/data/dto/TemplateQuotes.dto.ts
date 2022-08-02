import { EntityDto } from '../../core/interfaces/Entity.dto';
import { Formfield } from './Formfield.dto';

export interface TemplateQuotes extends EntityDto {
  name: string;
  form: Formfield<any>[];
}