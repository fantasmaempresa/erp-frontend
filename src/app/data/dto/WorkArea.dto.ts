import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface WorkAreaDto extends EntityDto {
  description: string;
  config: object;
}
