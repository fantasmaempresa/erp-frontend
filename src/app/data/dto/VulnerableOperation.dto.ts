import { EntityDto } from 'o2c_core';
import { ProcedureDto } from './Procedure.dto';
import { UnitDto } from './Unit.dto';

export interface VulnerableOperationDto extends EntityDto {
  data_form: string;
  procedure_id: number;
  procedure?: ProcedureDto;
  unit_id: number;
  unit?: UnitDto;
}
