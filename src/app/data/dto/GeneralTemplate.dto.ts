import { EntityDto } from 'o2c_core';

export interface GeneralTemplateDto extends EntityDto {
  name: string;
  form: Array<any>;
}
