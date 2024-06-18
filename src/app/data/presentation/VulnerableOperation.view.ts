import {
  FormFieldType,
  formField,
  formTable,
  viewCrud,
  viewLabel,
  viewMapTo,
} from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from 'src/app/core/constants/routes.constants';
import { ProcedureDto } from '../dto';
import { UnitDto } from '../dto/Unit.dto';
import { VulnerableOperationService } from '../services/vulnerable-operation.service';
import { EstatesForm } from './VulnerableOperationTraslativeDomain.view';
import { constitutionLegalEntitiesForm } from './VulnerableOperationCommercial.view';
import { VulnerableOperationsCapitalModification } from './VulnerableOperationsCapitalModification.view';
import { VulnerableOperationsMutualContractsView } from './VulnerableOperationsMutualContracts.view';

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

export class VulnerableOperationForm {
  @formTable({
    tableProvider: EstatesForm,
  })
  @formField({
    label: 'Operacion Vulnerable Traslativa de dominio',
    formFieldType: FormFieldType.TABLE,
  })
  @viewLabel('Operacion Vulnerable Traslativa de dominio')
  tableDomainTraslative: string;

  @formTable({
    tableProvider: constitutionLegalEntitiesForm,
  })
  @formField({
    label: 'Operacion Vulnerable Constitución de personas morales',
    formFieldType: FormFieldType.TABLE,
  })
  @viewLabel('Operacion Vulnerable Constitución de personas morales')
  tableComecialLegalPersonConstitutive: string;

  @formTable({
    tableProvider: VulnerableOperationsCapitalModification,
  })
  @formField({
    label: 'Modificacion, Disminución o Aumento de capital personas morales',
    formFieldType: FormFieldType.TABLE,
  })
  @viewLabel('Modificacion, Disminución o Aumento de capital personas morales')
  tableModificationLegalPersons: string;

  @formTable({
    tableProvider: VulnerableOperationsMutualContractsView,
  })
  @formField({
    label: 'Operacion Vulnerable Contrato mutuo con o sin garantia de crédito',
    formFieldType: FormFieldType.TABLE,
  })
  @viewLabel(
    'Operacion Vulnerable Contrato mutuo con o sin garantia de crédito',
  )
  tableMutualContract: string;

  constructor(
    tableDomainTraslative: string,
    tableComecialLegalPersonConstitutive: string,
    tableModificationLegalPersons: string,
    tableMutualContract: string,
  ) {
    this.tableDomainTraslative = tableDomainTraslative;
    this.tableComecialLegalPersonConstitutive = tableComecialLegalPersonConstitutive;
    this.tableModificationLegalPersons = tableModificationLegalPersons;
    this.tableMutualContract = tableMutualContract;
  }
}
