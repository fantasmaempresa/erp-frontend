import { Formfield } from './Formfield.dto';
import { EntityDto } from '../../core/interfaces';

export interface QuoteTemplate extends EntityDto {
  form: Formfield<any>[];
  operations?: any;
}
