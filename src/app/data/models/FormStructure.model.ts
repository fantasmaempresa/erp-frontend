import { EntityDto } from 'o2c_core';
import { Formfield } from '../dto';

export interface FormStructure extends EntityDto {
  name: string;
  description: string;
  form: Formfield<any>[];
  operations?: any;
}
