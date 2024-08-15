import { EntityDto } from 'o2c_core';

export interface UnitDto extends EntityDto {
  name: string;
  description: string;
  year: number;
  value: number;
}
