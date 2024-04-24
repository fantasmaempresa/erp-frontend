import { viewCrud, viewLabel, viewMapTo } from 'o2c_core';
import { VulnerableOperationService } from '../services/vulnerable-operation.service';
import { DEFAULT_ROUTE_CONFIGURATION } from 'src/app/core/constants/routes.constants';
import { ProcedureDto } from '../dto';
import { UnitDto } from '../dto/Unit.dto';

@viewCrud({
  classProvider: VulnerableOperationService,
  route: DEFAULT_ROUTE_CONFIGURATION,
  registerName: 'Operación Vulnerable',
})
export class VulnerableOperationView {
  @viewLabel('Nombre')
  data_form: string;

  procedure_id: number;

  @viewMapTo((value: any) => value?.name)
  procedure?: ProcedureDto;

  unit_id: number;
  unit?: UnitDto;

  constructor(
    data_form: string,
    procedure_id: number,
    unit_id: number,
    procedure?: ProcedureDto,
    unit?: UnitDto,
  ) {
    this.data_form = data_form;
    this.procedure_id = procedure_id;
    this.procedure = procedure;
    this.unit_id = unit_id;
    this.unit = unit;
  }
}
