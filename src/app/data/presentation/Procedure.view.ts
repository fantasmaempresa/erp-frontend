import { ViewActions, viewCrud, viewHTML, viewLabel } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { ProcedureService } from '../services/procedure.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcedureDto } from '../dto';
import { MatDialog } from '@angular/material/dialog';
import { DialogGrantorsComponent } from 'src/app/shared/components/dialog-grantors/dialog-grantors.component';
import { GrantorPercentageDialogComponent } from 'src/app/features/procedures/pages/grantor-percentage-dialog/grantor-percentage-dialog.component';
import { RegistrationProcedureDataDto } from '../dto/RegistrationProcedureData.dto';
import { ProcessingIncomeDto } from '../dto/ProcessingIncome.dto';
import { ProcedureCommentDto } from '../dto/ProcedureComment.dto';
import { GrantorDto } from '../dto/Grantor.dto';

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

  @viewLabel('Valor de operación')
  value_operation: number;

  // @viewLabel('Fecha')
  date: string;

  // @viewLabel('Credito')
  credit: string;

  observation: string;

  operation_id: number;

  user_id: number;

  place_id: number;

  client_id: number;

  staff_id: number;

  @viewLabel('Datos de registro')
  @viewHTML((registration_procedure_data) => {
    // @ts-ignore
    if (registration_procedure_data.length == 0) 
      return `<div style=" display: inline-block ;padding: 1.25rem; background: #f91a1a;margin-top: 1rem; border-radius: 50%"></div>`;
     else 
      return `<div style=" display: inline-block ;padding: 1.25rem; background: #3be30e;margin-top: 1rem; border-radius: 50%"></div>`;
    
  })
  registration_procedure_data: RegistrationProcedureDataDto[];


  @viewLabel('Datos de ingresos')
  @viewHTML((processing_income) => {
    // @ts-ignore
    if (processing_income.length == 0) 
      return `<div style=" display: inline-block ;padding: 1.25rem; background: #f91a1a;margin-top: 1rem; border-radius: 50%"></div>`;
     else 
      return `<div style=" display: inline-block ;padding: 1.25rem; background: #3be30e;margin-top: 1rem; border-radius: 50%"></div>`;
    
  })
  processing_income: ProcessingIncomeDto[];


  @viewLabel('Comentarios')
  @viewHTML((comments) => {
    // @ts-ignore
    if (comments.length == 0) 
      return `<div style=" display: inline-block ;padding: 1.25rem; background: #f91a1a;margin-top: 1rem; border-radius: 50%"></div>`;
     else 
      return `<div style=" display: inline-block ;padding: 1.25rem; background: #3be30e;margin-top: 1rem; border-radius: 50%"></div>`;
    
  })
  comments: ProcedureCommentDto[];

  
  

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
  ) {
    this.name = name;
    this.instrument = instrument;
    this.volume = volume;
    this.folio_min = folio_min;
    this.folio_max = folio_max;
    this.date_proceedings = date_proceedings;
    this.value_operation = value_operation;
    this.date = date;
    this.credit = credit;
    this.observation = observation;
    this.operation_id = operation_id;
    this.user_id = user_id;
    this.place_id = place_id;
    this.client_id = client_id;
    this.staff_id = staff_id;
    this.registration_procedure_data = registration_procedure_data;
    this.processing_income = processing_income;
    this.comments = comments;
  }
}
