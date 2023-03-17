import { EntityDto } from 'o2c_core';
import { Formfield } from './Formfield.dto';

export interface TemplateQuotes extends EntityDto {
  name: string;
  form: Formfield<any>[];
}
