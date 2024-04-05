import { EntityDto } from 'o2c_core';

export interface RateDto extends EntityDto {
  year: number;
  lower_limit: number;
  upper_limit: number;
  fixed_fee: number;
  surplus: number;
}
