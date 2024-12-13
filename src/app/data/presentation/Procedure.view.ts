import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormFieldType,
  ViewActions,
  ViewContextService,
  advancedFilters,
  dialogLabel,
  formField,
  formTable,
  popUpSelector,
  viewCrud,
  viewDialog,
  viewHTML,
  viewLabel,
  viewMapTo,
} from 'o2c_core';
import { GrantorPercentageDialogComponent } from 'src/app/features/procedures/pages/grantor-percentage-dialog/grantor-percentage-dialog.component';
import { DialogGrantorsComponent } from 'src/app/shared/components/dialog-grantors/dialog-grantors.component';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { ClientDto, ProcedureDto, StaffDto, UserDto } from '../dto';
import { ProcedureCommentDto } from '../dto/ProcedureComment.dto';
import { ProcessingIncomeDto } from '../dto/ProcessingIncome.dto';
import { RegistrationProcedureDataDto } from '../dto/RegistrationProcedureData.dto';
import { ProcedureService } from '../services/procedure.service';
import { GrantorDto } from '../dto/Grantor.dto';
import { OperationsDto } from '../dto/Operations.dto';
import { FolioDto } from '../dto/Folio.dto';
import { GrantorView } from './Grantor.view';
import { StakeView } from './Stake.view';
import { StakeDto } from '../dto/Stake.dto';
import { NotPassedProcedureDialogComponent } from 'src/app/features/procedures/pages/not-passed-procedure-dialog/not-passed-procedure-dialog.component';
import { ClientView } from './Client.view';
import { UserView } from './User.view';
import { BookView } from './Book.view';

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
    isVisible: (row: ProcedureDto) => row && row?.grantors != null,
  },
);

const goToViewGrantors = new ViewActions<ProcedureDto>(
  async ({ row, injector }) => {
    const procedure = row as ProcedureDto;
    const dialog = injector.get(MatDialog);
    dialog.open(DialogGrantorsComponent, {
      data: {
        grantors: procedure.grantors,
        procedure_id: procedure.id,
      },
    });
  },
  'visibility',
  {
    tooltip: 'Ver otorgantes',
    color: 'accent',
    isVisible: (row: ProcedureDto) => row && row?.grantors != null,
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


const goToReminds = new ViewActions<ProcedureDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as ProcedureDto).id, 'reminders'], {
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

const cancelProcedure = new ViewActions<ProcedureDto>(
  async ({ row, injector }) => {
    const procedure = row as ProcedureDto;
    const dialog = injector.get(MatDialog);
    const viewContextService = injector.get(ViewContextService);

    dialog
      .open(NotPassedProcedureDialogComponent, {
        data: {
          id: procedure.id,
        },
      })
      .beforeClosed()
      .subscribe((result) => {
        if (result) viewContextService.reloadView();
      });
  },
  'cancel',
  {
    tooltip: 'Cancelar',
    color: 'warn',
    isVisible: (row) => row && row.status != 2,
  },
);

export class StakeAssignGrantor {
  @popUpSelector({
    label: 'Otorgante',
    config: {
      title: 'Otorgante',
      viewClass: GrantorView,
      options: {
        isMulti: false,
        valueAttribute: ((value: any) => value)
      },
    },
  })
  grantor: GrantorDto;

  @viewLabel('Nombre')
  grantor__name: string;

  @popUpSelector({
    label: 'Participación',
    config: {
      title: 'Participación',
      viewClass: StakeView,
      options: {
        isMulti: false,
        valueAttribute: ((value: any) => { console.log('function class --> value ', value); return value; })
      },
    },
  })
  // @viewLabel('Participación')
  // @viewMapTo((value: any) => value.name)
  stake: StakeDto;
  @viewLabel('Participación')
  stake__name: string;

  constructor(
    grantor: GrantorDto,
    stake: StakeDto,
    grantor__name: string,
    stake__name: string
  ) {
    this.grantor = grantor;
    this.grantor__name = grantor__name;
    this.stake = stake;
    this.stake__name = stake__name;
  }
}

export class StakeAssignGrantorTable {
  @formTable({
    tableProvider: StakeAssignGrantor,
  })
  @formField({
    label: 'Otorgantes de escritura',
    formFieldType: FormFieldType.TABLE,
  })
  stakes: string;

  constructor(stakes: string) {
    this.stakes = stakes;
  }
}

export class AdvanceFilterProcedure {
  @popUpSelector({
    label: 'Libros',
    config: {
      title: 'Libros',
      viewClass: BookView,
      options: {
        isMulti: true,
      },
    },
  })
  @viewLabel('Otorgante')
  book: number;

  @popUpSelector({
    label: 'Otorgante',
    config: {
      title: 'Otorgante',
      viewClass: GrantorView,
      options: {
        isMulti: true,
      },
    },
  })
  @viewLabel('Otorgante')
  grantor_id: number;

  @popUpSelector({
    label: 'Cliente',
    config: {
      title: 'Cliente',
      viewClass: ClientView,
      options: {
        isMulti: true,
      },
    },
  })
  @viewLabel('Cliente')
  client_id: number;

  @popUpSelector({
    label: 'Usuario',
    config: {
      title: 'Usuario',
      viewClass: UserView,
      options: {
        isMulti: true,
      },
    },
  })
  @viewLabel('Usuario')
  user_id: number;

  constructor(
    book: number,
    grantor_id: number,
    client_id: number,
    user_id: number,
  ) {
    this.book = book;
    this.grantor_id = grantor_id;
    this.client_id = client_id;
    this.user_id = user_id;
  }
}

@advancedFilters(AdvanceFilterProcedure)
@viewDialog('Información del trámite')
@viewCrud({
  classProvider: ProcedureService,
  registerName: 'Trámites',
  actions: [
    cancelProcedure,
    goToDocumentsLink,
    goToShapesLink,
    goToViewGrantors,
    goToAssingPercentageGrantor,
    goToComments,
    goToProcessingIncome,
    goToRegistrationData,
    goToReminds
  ],
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class ProcedureView {
  @viewLabel('Expediente')
  name: string;

  @viewLabel('Estado')
  @viewHTML((status: any) => {
    let html = '';
    switch (status) {
      case 1:
        html =
          '<span style="padding: 1rem; background: #0d2b3e; color: #eee ; border-radius: 10px; font-size: 1rem;">En progreso</span>';
        break;
      case 2:
        html =
          '<span style="padding: 1rem; background: #a30808; color: #eee ; border-radius: 10px; font-size: 1rem;">No paso</span>';
        break;
      case 3:
        html =
          '<span style="padding: 1rem; background: #0f7d0d; color: #eee ; border-radius: 10px; font-size: 1rem;">Aceptado</span>';
        break;
      case 4:
        html =
          '<span style="padding: 1rem; background: #dfc356; color: #eee ; border-radius: 10px; font-size: 1rem;">Terminado</span>';
        break;
    }

    return html;
  })
  status: number;

  @viewLabel('Volumen')
  @viewMapTo((folio: any) => folio.book.name)
  folio: FolioDto;

  @viewLabel('Instrumento')
  folio__name: number;

  @viewLabel('Del folio')
  folio__folio_min: number;

  @viewLabel('Al Folio')
  folio__folio_max: number;

  @viewLabel('Fecha de Firma')
  date: string;

  @dialogLabel('Valor de operación')
  value_operation: number;

  // @viewLabel('Fecha')
  @dialogLabel('Fecha')
  date_proceedings: string;

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
    for (let operation of operations) {
      html += `<span style="padding: 1rem; background: #0d2b3e; color: #eee ; border-radius: 10px; font-size: 1rem;">${operation.name}</span>`;
    }
    return html;
  })
  operations: OperationsDto[];

  @dialogLabel('Otorgantes de trámite')
  @viewHTML((grantors: any) => {
    let html: string = '';
    // @ts-ignore
    for (let grantor of grantors) {
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

  @dialogLabel('Resonsable')
  @viewMapTo(
    (staff: any) =>
      staff.name + ' ' + staff.last_name + ' ' + staff.mother_last_name,
  )
  staff: StaffDto;

  @dialogLabel('Fecha de creación de registro')
  created_at: Date;

  constructor(
    name: string,
    value_operation: number,
    date_proceedings: string,
    date: string,
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
    staff: StaffDto,
    created_at: Date,
    operations: OperationsDto[],
    folio: FolioDto,
    folio__name: number,
    folio__folio_min: number,
    folio__folio_max: number,
    status: number,
  ) {
    this.name = name;
    this.status = status;
    this.folio = folio;
    this.folio__name = folio__name;
    this.folio__folio_min = folio__folio_min;
    this.folio__folio_max = folio__folio_max;
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
    this.staff = staff;
    this.user = user;
    this.created_at = created_at;
    this.observation = observation;
  }
}
