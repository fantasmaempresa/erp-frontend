import { Formfield } from './Formfield.dto';
import { EntityDto } from 'o2c_core';

export interface QuoteTemplate extends EntityDto {
  form: Formfield<any>[];
  operations?: any;
}
