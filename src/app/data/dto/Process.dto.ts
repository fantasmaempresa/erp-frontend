import { EntityDto } from '../../core/interfaces';

export interface ProcessDto extends EntityDto {
  description: string;

  config: string;
}
