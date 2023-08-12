import { EntityDto } from 'o2c_core';

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
  operation_id: number;
  user_id: number;
  place_id: number;
  client_id: number;
  staff_id: number;
}
