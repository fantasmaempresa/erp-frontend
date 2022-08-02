import { Formfield } from './Formfield.dto';
import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface QuoteTemplate extends EntityDto {
  form: Formfield<any>[];
  operations?: any;
}
