import { EntityDto } from 'o2c_core';

export interface DocumentDto extends EntityDto {
  name: string;
  description: string;
  quote: string;
  url?: string;
  pivot?: {
    id: number;
    created_at: string;
    document_id: number;
    file: string;
    procedure_id: number;
    updated_at: string;
  };
}
