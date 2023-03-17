import { EntityDto } from 'o2c_core';

export interface WorkAreaDto extends EntityDto {
  description: string;
  config: object;
}
