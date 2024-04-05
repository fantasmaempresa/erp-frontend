import { EntityDto } from 'o2c_core';
import { GrantorDto } from './Grantor.dto';

export interface ProcedureDto extends EntityDto {
  proceedings: string;
  value_operation: number;
  date_proceedings: string;
  instrument: string;
  date: string;
  volume: string;
  folio_min: number;
  folio_max: number;
  credit: string;
  observation: string;
  grantors: GrantorDto[];
  operation_id: number;
  user_id: number;
  place_id: number;
  client_id: number;
  staff_id: number;
}
