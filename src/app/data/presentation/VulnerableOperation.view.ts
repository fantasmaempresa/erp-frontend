import {
  FormFieldType,
  ViewActions,
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
import { ActivatedRoute, Router } from '@angular/router';
import { VulnerableOperationDto } from '../dto/VulnerableOperation.dto';

const goToDocumentsLink = new ViewActions<VulnerableOperationDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as VulnerableOperationDto).id, 'documentsLink'], {
      relativeTo: route,
    });
  },
  'contact_page',
  {
    tooltip: 'Expediente de trámite',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

@viewCrud({
  classProvider: VulnerableOperationService,
  route: DEFAULT_ROUTE_CONFIGURATION,
  registerName: 'Operación Vulnerable',
  actions: [goToDocumentsLink],
})
export class VulnerableOperationView {
  @viewLabel('Categoría')
  type_category: string;
  
  @viewLabel('Tipo de actividad')
  type_vulnerable_operation: string;
  
  grantor_first_id: string;
  
  grantor_second_id: string;
  
  vulnerable_operation_data: string;
  
  unit_id: number;
  inversion_unit_id: number;
  procedure_id: number;

  @viewLabel('Instrumento')
  @viewMapTo((value: any) => value?.instrument)
  procedure?: ProcedureDto;

  unit?: UnitDto;

  constructor(
    type_category: string,
    type_vulnerable_operation: string,
    grantor_first_id: string,
    grantor_second_id: string,
    vulnerable_operation_data: string,
    procedure_id: number,
    unit_id: number,
    inversion_unit_id: number,
    procedure: ProcedureDto,
    unit: UnitDto
  ) {
    this.type_category = type_category;
    this.type_vulnerable_operation = type_vulnerable_operation;
    this.grantor_first_id = grantor_first_id;
    this.grantor_second_id = grantor_second_id;
    this.vulnerable_operation_data = vulnerable_operation_data;
    this.procedure_id = procedure_id;
    this.procedure = procedure;
    this.unit_id = unit_id;
    this.unit = unit;
    this.inversion_unit_id = inversion_unit_id; 
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
    this.tableComecialLegalPersonConstitutive =
      tableComecialLegalPersonConstitutive;
    this.tableModificationLegalPersons = tableModificationLegalPersons;
    this.tableMutualContract = tableMutualContract;
  }
}
