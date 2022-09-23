import { EntityDto } from '../../core/interfaces';

export interface DocumentDto extends EntityDto {
  name: string;
  description: string;
  quote: string;
}
