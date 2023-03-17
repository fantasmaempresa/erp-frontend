import { EntityDto } from 'o2c_core';

export interface ProcessDto extends EntityDto {
  description: string;

  config: string;
}
