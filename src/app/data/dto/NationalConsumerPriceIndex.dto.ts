import { EntityDto } from 'o2c_core';

export interface NationalConsumerPriceIndexDto extends EntityDto {
  year: number;

  month: number;

  value: number;
}
