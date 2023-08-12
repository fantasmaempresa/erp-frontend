import { EntityDto } from 'o2c_core';

export interface TemplateShapeDto extends EntityDto {
  name: string;
  file: string;
  form: [];
}
