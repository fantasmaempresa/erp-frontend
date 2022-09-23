import { EntityDto } from '../../core/interfaces';

export interface WorkAreaDto extends EntityDto {
  description: string;
  config: object;
}
