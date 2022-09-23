import { EntityDto } from '../../core/interfaces';

export interface ProcessPhaseDto extends EntityDto {
  name: string;

  description: string;

  form: string;

  quotes: string;

  payments: string;
}
