import { EntityDto } from 'o2c_core';

export interface ProcessPhaseDto extends EntityDto {
  name: string;

  description: string;

  form: string;

  quotes: string;

  payments: string;
}
