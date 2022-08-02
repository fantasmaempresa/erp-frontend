import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface ProcessDto extends EntityDto {
  description: string;

  config: string;
}
