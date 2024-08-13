import { ActivatedRoute, Router } from '@angular/router';
import {
  formField,
  FormFieldType,
  formTable,
  popUpSelector,
  viewActions,
  ViewActions,
  viewCrud,
  viewHTML,
  viewLabel,
  viewMapTo,
} from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from 'src/app/core/constants/routes.constants';
import { ProcedureDto, UserDto } from '../dto';
import { BookDto } from '../dto/Book.dto';
import { FolioDto } from '../dto/Folio.dto';
import {
  FolioService,
  OrderFolioService,
} from '../services/folio-service.service';
import { UserView } from './User.view';

const goToOrderInstruments = new ViewActions<FolioDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', 'list-order'], {
      relativeTo: route,
    });
  },
  'info',
  {
    tooltip: 'Ver folios libres',
    color: 'accent',
    isVisible: (row) => true,
  },
);

const goToErrorFolios = new ViewActions<FolioDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as FolioDto).id, 'errors'], {
      relativeTo: route,
    });
  },
  'input',
  {
    tooltip: 'Registrar error en folios',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

export class FolioErrors {
  @formField({
    label: 'Folio',
    formFieldType: FormFieldType.NUMBER,
  })
  @viewLabel('Folio')
  folio: number;

  @formField({
    label: 'Descripción de error',
    formFieldType: FormFieldType.TEXTAREA,
  })
  @viewLabel('Descripción de error')
  comment: string;

  @popUpSelector({
    label: 'Usuario',
    config: {
      title: 'Usuario',
      viewClass: UserView,
      options: {
        isMulti: false,
      },
    },
  })
  @viewLabel('Usuario')
  user_id: number;

  constructor(folio: number, comment: string, user_id: number) {
    this.folio = folio;
    this.comment = comment;
    this.user_id = user_id;
  }
}

export class FolioErrorsTable {
  @formTable({
    tableProvider: FolioErrors,
  })
  @formField({
    label: 'Errores en folios',
    formFieldType: FormFieldType.TABLE,
  })
  canceled_folios: string;

  constructor(canceled_folios: string) {
    this.canceled_folios = canceled_folios;
  }
}

@viewCrud({
  classProvider: FolioService,
  registerName: 'Folios',
  route: DEFAULT_ROUTE_CONFIGURATION,
  actions: [goToErrorFolios, goToOrderInstruments],
})
export class FolioView {
  @viewLabel('Instrumento')
  name: string;
  @viewLabel('Del Folio')
  folio_min: number;
  @viewLabel('Al Folio')
  folio_max: number;
  book_id: number;
  procedure_id: number;
  user_id: number;
  @viewLabel('Usuario que registro')
  @viewMapTo((value: any) => value.email)
  user: UserDto;
  book: BookDto;

  @viewLabel('Expediente')
  @viewMapTo((value: any) => value.name)
  procedure: ProcedureDto;

  constructor(
    name: string,
    folio_min: number,
    folio_max: number,
    book_id: number,
    procedure_id: number,
    user_id: number,
    user: UserDto,
    book: BookDto,
    procedure: ProcedureDto,
  ) {
    this.name = name;
    this.folio_min = folio_min;
    this.folio_max = folio_max;
    this.book_id = book_id;
    this.procedure_id = procedure_id;
    this.user_id = user_id;
    this.user = user;
    this.book = book;
    this.procedure = procedure;
  }
}

@viewActions({
  classProvider: OrderFolioService,
  actions: [],
})
export class FolioOrderView {
  @viewLabel('Instrumento')
  name: string;
  @viewLabel('Del Folio')
  folio_min: number;
  @viewLabel('Al Folio')
  folio_max: number;

  @viewLabel('Status')
  @viewHTML((procedure: any) => {
    const status = {
      1: '#3be30e', //Procedure
      2: '#f91a1a', //sin darse de alta
    };

    if(procedure){
      return `<div style=" display: inline-block ;padding: 1.25rem; background: ${status[1]};margin-top: 1rem; border-radius: 50%"></div>`
    }
    return `<div style=" display: inline-block ;padding: 1.25rem; background: ${status[2]};margin-top: 1rem; border-radius: 50%"></div>`
    })
  procedure_id:  number | null;
  constructor(
    name: string,
    folio_min: number,
    folio_max: number,
    procedure_id: number | null,
  ) {
    this.name = name;
    this.folio_min = folio_min;
    this.folio_max = folio_max;
    this.procedure_id = procedure_id;
  }
}
