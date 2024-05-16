import { EntityDto } from 'o2c_core';

export interface CategoryOperationDto extends EntityDto {
  id: number;
  name: string;
  description: string;
  config: Array<any>;
  form: Array<any>;
}
