import { viewActions, ViewActions, viewCrud, viewLabel, viewMapTo } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from 'src/app/core/constants/routes.constants';
import { DocumentDto, ProcedureDto, StaffDto, UserDto } from '../dto';
import { OperationsDto } from '../dto/Operations.dto';
import { PlaceDto } from '../dto/Place.dto';
import { ProcessingIncomePhaseService, ProcessingIncomeService } from '../services/processing-income.service';
import { ProcessingIncomeDto } from '../dto/ProcessingIncome.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

const goToDocumentsLink = new ViewActions<ProcessingIncomeDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as ProcessingIncomeDto).id, 'documentsLink'], {
      relativeTo: route,
    });
  },
  'contact_page',
  {
    tooltip: 'Documentos de ingreso',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

const goToComments = new ViewActions<ProcessingIncomeDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as ProcessingIncomeDto).id, 'comments'], {
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

const goToReminds = new ViewActions<ProcessingIncomeDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as ProcessingIncomeDto).id, 'reminders'], {
      relativeTo: route,
    });
  },
  'alarm',
  {
    tooltip: 'Recordatorios de ingresos',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

@viewCrud({
  classProvider: ProcessingIncomeService,
  registerName: 'Información de registro',
  actions: [goToDocumentsLink, goToComments, goToReminds],
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class ProcessingIncomeView {

  @viewLabel('Información de registro')
  name: string;

  @viewLabel('Fecha de ingreso')
  date_income: string;

  config: string;
  @viewLabel('Gestor')
  @viewMapTo((value: any) => value?.name)
  staff: StaffDto;
  procedure_id: number;
  operation_id: number;
  staff_id: number;
  place_id: number;
  user_id: number;

  @viewLabel('User')
  @viewMapTo((value: any) => value?.name)
  user?: UserDto;
  @viewLabel('Lugar')
  @viewMapTo((value: any) => value?.name)
  place?: PlaceDto;
  operation?: OperationsDto
  procedure?: ProcedureDto;
  documents?: DocumentDto[];

  @viewLabel('Fecha')
  @viewMapTo((value: any) => {
    const datePipe = new DatePipe('en-MX');
    return datePipe.transform(value, 'dd-MM-yyyy HH:mm:ss');
  })
  created_at?: Date;

  constructor(
    name: string,
    date_income: string,
    config: string,
    staff: StaffDto,
    procedure_id: number,
    operation_id: number,
    staff_id: number,
    place_id: number,
    user_id: number,
    user?: UserDto,
    place?: PlaceDto,
    operation?: OperationsDto,
    procedure?: ProcedureDto,
    documents?: DocumentDto[],
    created_at?: Date,
  ) {
    this.name = name;
    this.date_income = date_income;
    this.config = config;
    this.staff = staff;
    this.procedure_id = procedure_id;
    this.operation_id = operation_id;
    this.staff_id = staff_id;
    this.place_id = place_id;
    this.user_id = user_id;
    this.user = user;
    this.place = place;
    this.operation = operation;
    this.procedure = procedure;
    this.documents = documents;
    this.created_at = created_at;
  }
}


const newProcessingIncomePhase =  new ViewActions<ProcessingIncomeDto>(
  async ({ row, injector }) => {
    let procedure_id = localStorage.getItem('phase_procedure_id');
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['./incoming', procedure_id, 'new'], {
      relativeTo: route,
    });
  },
  'add',
  {
    tooltip: 'Agregar gestión',
    color: 'primary',
    isVisible: (row: ProcessingIncomeDto) => true,
  },
);


const editProcessingIncomePhase = new ViewActions<ProcessingIncomeDto>(
  async ({ row, injector }) => {
    let procedure_id = localStorage.getItem('phase_procedure_id');
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['./incoming', procedure_id, (row as ProcessingIncomeDto).id], {
      relativeTo: route,
    });
  },
  'edit',
  {
    tooltip: 'Editar gestión',
    color: 'primary',
    isVisible: (row: ProcessingIncomeDto) => row && row.id > 0,
  },
);

const goToCommentsPhase = new ViewActions<ProcessingIncomeDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['./', (row as ProcessingIncomeDto).id, 'comments'], {
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


const goToDocumentsLinkPhase = new ViewActions<ProcessingIncomeDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['./', (row as ProcessingIncomeDto).id, 'documentsLink'], {
      relativeTo: route,
    });
  },
  'contact_page',
  {
    tooltip: 'Documentos de ingreso',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

@viewActions({
  classProvider: ProcessingIncomePhaseService,
  actions: [newProcessingIncomePhase, editProcessingIncomePhase, goToDocumentsLinkPhase, goToCommentsPhase],
})
export class ProcessingIncomePhaseView extends ProcessingIncomeView {

}
