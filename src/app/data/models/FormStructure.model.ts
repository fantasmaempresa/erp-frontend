import { EntityDto } from '../../core/interfaces';
import { Formfield } from '../dto';

export interface FormStructure extends EntityDto {
  name: string;
  description: string;
  form: Formfield<any>[];
  operations?: any;
}
