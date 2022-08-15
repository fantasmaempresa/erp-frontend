import { EntityDto } from '../../core/interfaces/Entity.dto';
import { Formfield } from '../dto/Formfield.dto';

export interface FormStructure extends EntityDto {
  name: string;
  description: string;
  form: Formfield<any>[];
  operations?: any;
}
