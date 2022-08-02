import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface DocumentDto extends EntityDto {
  name: string;
  description: string;
  quote: string;
}
