import { EntityDto } from 'o2c_core';
import { ProcedureDto } from './Procedure.dto';
import { UnitDto } from './Unit.dto';
import { InversionUnitDto } from './InversionUnit.dto';

export interface VulnerableOperationDto extends EntityDto {
  type_category: string;
  type_vulnerable_operation: string;
  grantor_first_id: string;
  grantor_second_id: string;
  vulnerable_operation_data: Object;
  procedure_id: number;
  procedure?: ProcedureDto;
  unit_id: number;
  unit?: UnitDto;
  inversion_unit_id: number;
  inversion_unit: InversionUnitDto;
}
