import { EntityDto } from 'o2c_core';

export interface DocumentDto extends EntityDto {
  name: string;
  description: string;
  quote: string;
  url?: string;
}
