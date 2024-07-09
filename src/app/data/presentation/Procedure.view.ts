import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormFieldType,
  ViewActions,
  advancedFilters,
  dialogLabel,
  formField,
  viewCrud,
  viewDialog,
  viewHTML,
  viewLabel,
  viewMapTo,
} from 'o2c_core';
import { GrantorPercentageDialogComponent } from 'src/app/features/procedures/pages/grantor-percentage-dialog/grantor-percentage-dialog.component';
import { DialogGrantorsComponent } from 'src/app/shared/components/dialog-grantors/dialog-grantors.component';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { ClientDto, ProcedureDto, UserDto } from '../dto';
import { ProcedureCommentDto } from '../dto/ProcedureComment.dto';
import { ProcessingIncomeDto } from '../dto/ProcessingIncome.dto';
import { RegistrationProcedureDataDto } from '../dto/RegistrationProcedureData.dto';
import { ProcedureService } from '../services/procedure.service';
import { GrantorDto } from '../dto/Grantor.dto';
import { OperationsDto } from '../dto/Operations.dto';

const goToAssingPercentageGrantor = new ViewActions<ProcedureDto>(
  async ({ row, injector }) => {
    const procedure = row as ProcedureDto;
    const dialog = injector.get(MatDialog);
    dialog.open(GrantorPercentageDialogComponent, {
      data: {
        id: procedure.id,
        grantors: procedure.grantors,
      },
    });
  },
  'calculate',
  {
    tooltip: 'Asignar porcentaje de otorgante',
    color: 'accent',
    isVisible: (row: ProcedureDto) => row && row.grantors.length > 0,
  },
);

const goToViewGrantors = new ViewActions<ProcedureDto>(
  async ({ row, injector }) => {
    const procedure = row as ProcedureDto;
    const dialog = injector.get(MatDialog);
    dialog.open(DialogGrantorsComponent, {
      data: {
        grantors: procedure.grantors,
      },
    });
  },
  'visibility',
  {
    tooltip: 'Ver otorgantes',
    color: 'accent',
    isVisible: (row: ProcedureDto) => row && row.grantors.length > 0,
  },
);

const goToProcessingIncome = new ViewActions<ProcedureDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as ProcedureDto).id, 'incoming'], {
      relativeTo: route,
    });
  },
  'input',
  {
    tooltip: 'Historia de ingresos',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

const goToRegistrationData = new ViewActions<ProcedureDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(
      ['../', (row as ProcedureDto).id, 'registrationData'],
      {
        relativeTo: route,
      },
    );
  },
  'folder_supervised',
  {
    tooltip: 'Registro',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

const goToComments = new ViewActions<ProcedureDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as ProcedureDto).id, 'comments'], {
      relativeTo: route,
    });
  },
  'chat',
  {
    tooltip: 'Comentarios de trámite',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

const goToDocumentsLink = new ViewActions<ProcedureDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as ProcedureDto).id, 'documentsLink'], {
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

const goToShapesLink = new ViewActions<ProcedureDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as ProcedureDto).id, 'shapeLink'], {
      relativeTo: route,
    });
  },
  'description',
  {
    tooltip: 'Formas del expediente',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

export class AdvanceFilterProcedure{
  @formField({
    label: 'Libro(s) separar por coma',
    formFieldType: FormFieldType.TEXT,
  })
  book: string;

  @formField({
    label: 'Fecha',
    formFieldType: FormFieldType.DATE,
  })
  date_min: Date;

  @formField({
    label: 'Fecha',
    formFieldType: FormFieldType.DATE,
  })
  date_max: Date;

  constructor(book: string, date_min: Date, date_max: Date) {
    this.book = book;
    this.date_min = date_min;
    this.date_max = date_max;
  }
}

@advancedFilters(AdvanceFilterProcedure)
@viewDialog('Información del trámite')
@viewCrud({
  classProvider: ProcedureService,
  registerName: 'Trámites',
  actions: [
    goToDocumentsLink,
    goToShapesLink,
    goToComments,
    goToRegistrationData,
    goToViewGrantors,
    goToAssingPercentageGrantor,
    goToProcessingIncome,
  ],
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class ProcedureView {
  @viewLabel('Expediente')
  name: string;

  @viewLabel('Instrumento')
  instrument: string;

  @viewLabel('Volumen')
  volume: string;

  @viewLabel('Folio de inicio')
  folio_min: number;

  @viewLabel('Folio de final')
  folio_max: number;

  @viewLabel('Fecha de Firma')
  date_proceedings: string;

  @dialogLabel('Valor de operación')
  value_operation: number;

  // @viewLabel('Fecha')
  @dialogLabel('Fecha')
  date: string;

  // @viewLabel('Credito')
  credit: string;

  @dialogLabel('Observaciones')
  observation: string;

  operation_id: number;

  user_id: number;

  place_id: number;

  client_id: number;

  staff_id: number;

  @viewLabel('Datos de registro')
  @viewHTML((registration_procedure_data) => {
    // @ts-ignore
    const count = registration_procedure_data.length ?? 0;
    // @ts-ignore
    if (registration_procedure_data.length == 0)
      return `<div style=" display: inline-block ;padding: 1.25rem; background: #f91a1a;margin-top: 1rem; border-radius: 50%"></div>`;
    else
      return `<div style="display: inline-block; padding: 1.5rem; background-color: #3be30e; margin-top: 1rem; border-radius: 50%; line-height: 1; text-align: center; font-size: 1rem;">${count}</div>`;
  })
  registration_procedure_data: RegistrationProcedureDataDto[];

  @viewLabel('Datos de ingresos')
  @viewHTML((processing_income) => {
    // @ts-ignore
    const count = processing_income.length ?? 0;
    // @ts-ignore
    if (processing_income.length == 0)
      return `<div style="display: inline-block ;padding: 1.25rem; background: #f91a1a;margin-top: 1rem; border-radius: 50%"></div>`;
    // return `<div style="display: inline-block ;padding: 1.50rem; background: #3be30e;margin-top: 1rem; border-radius: 50%"><span style="font-size: xx-small">${count}</span></div>`;
    else
      return `<div style="display: inline-block; padding: 1.5rem; background-color: #3be30e; margin-top: 1rem; border-radius: 50%; line-height: 1; text-align: center; font-size: 1rem;">${count}</div>`;
  })
  processing_income: ProcessingIncomeDto[];

  @viewLabel('Comentarios')
  @viewHTML((comments) => {
    // @ts-ignore
    const count = comments.length ?? 0;
    // @ts-ignore
    if (comments.length == 0)
      return `<div style=" display: inline-block ;padding: 1.25rem; background: #f91a1a;margin-top: 1rem; border-radius: 50%"></div>`;
    else
      return `<div style="display: inline-block; padding: 1.5rem; background-color: #3be30e; margin-top: 1rem; border-radius: 50%; line-height: 1; text-align: center; font-size: 1rem;">${count}</div>`;
  })
  comments: ProcedureCommentDto[];

  @dialogLabel('Operaciones')
  @viewHTML((operations: any) => {
    let html: string = '';
    for(let operation of operations){
      html += `<span style="padding: 1rem; background: #0d2b3e; color: #eee ; border-radius: 10px; font-size: 1rem;">${operation.name}</span>`;
    }
    return html;
  })
  operations: OperationsDto[];

  @dialogLabel('Otorgantes de trámite')
  @viewHTML((grantors: any) => {
    let html: string = '';
    // @ts-ignore
    for(let grantor of grantors){
      html += `<span style="padding: 1rem; background: #0d2b3e; color: #eee ; border-radius: 10px; font-size: 1rem;">${grantor.name} ${grantor.father_last_name} ${grantor.mother_last_name}</span>`;
    }
    return html;
  })
  grantors: GrantorDto[];

  @dialogLabel('Cliente')
  @viewMapTo((client: any) => client.name)
  client: ClientDto;

  @dialogLabel('Usuario quien registro')
  @viewMapTo((user: any) => user.email)
  user: UserDto;

  @dialogLabel('Fecha de creación de registro')
  created_at: Date;

  constructor(
    name: string,
    instrument: string,
    value_operation: number,
    date_proceedings: string,
    date: string,
    volume: string,
    folio_min: number,
    folio_max: number,
    credit: string,
    observation: string,
    operation_id: number,
    user_id: number,
    place_id: number,
    client_id: number,
    staff_id: number,
    registration_procedure_data: RegistrationProcedureDataDto[],
    processing_income: ProcessingIncomeDto[],
    comments: ProcedureCommentDto[],
    grantors: GrantorDto[],
    client: ClientDto,
    user: UserDto,
    created_at: Date,
    operations: OperationsDto[],
  ) {
    this.name = name;
    this.instrument = instrument;
    this.volume = volume;
    this.folio_min = folio_min;
    this.folio_max = folio_max;
    this.date_proceedings = date_proceedings;
    this.operations = operations;
    this.value_operation = value_operation;
    this.date = date;
    this.credit = credit;
    this.operation_id = operation_id;
    this.user_id = user_id;
    this.place_id = place_id;
    this.client_id = client_id;
    this.staff_id = staff_id;
    this.registration_procedure_data = registration_procedure_data;
    this.processing_income = processing_income;
    this.comments = comments;
    this.grantors = grantors;
    this.client = client;
    this.user = user;
    this.created_at = created_at;
    this.observation = observation;
  }
}


