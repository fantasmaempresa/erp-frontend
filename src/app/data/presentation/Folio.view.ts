import { ActivatedRoute, Router } from '@angular/router';
import {
  advancedFilters,
  dialogLabel,
  formField,
  FormFieldType,
  formTable,
  MessageHelper,
  popUpSelector,
  viewActions,
  ViewActions,
  ViewContextService,
  viewCrud,
  viewDialog,
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

const viewResume = new ViewActions<FolioDto>(
  async ({ row, injector }) => {
    const _service = injector.get(FolioService);
    const viewContextService = injector.get(ViewContextService);
    const unsetProcedure = (id: number) => {
      _service.unsetProcedure((row as FolioDto).id).subscribe({
        next: async () => {
          await MessageHelper.successMessage(
            'Éxito',
            'el proceso fue desvinculado éxitosamente',
          );
          viewContextService.reloadView();
        },
        error: (error) => {
          MessageHelper.errorMessage(error);
        },
      });
    };

    MessageHelper.decisionMessage(
      'Desvincular proceso',
      '¿Deseas desvincular el proceso?',
      unsetProcedure.bind(this),
    );
  },
  'cancel_presentation',
  {
    tooltip: 'Cancelar expediente',
    color: 'accent',
    isVisible: (row) => true,
  },
);

const goToUnsetProcedure = new ViewActions<FolioDto>(
  async ({ row, injector }) => {
    const _service = injector.get(FolioService);
    const viewContextService = injector.get(ViewContextService);
    const unsetProcedure = (id: number) => {
      _service.unsetProcedure((row as FolioDto).id).subscribe({
        next: async () => {
          await MessageHelper.successMessage(
            'Éxito',
            'el proceso fue desvinculado éxitosamente',
          );
          viewContextService.reloadView();
        },
        error: (error) => {
          MessageHelper.errorMessage(error);
        },
      });
    };

    MessageHelper.decisionMessage(
      'Desvincular proceso',
      '¿Deseas desvincular el proceso?',
      unsetProcedure.bind(this),
    );
  },
  'cancel_presentation',
  {
    tooltip: 'Cancelar expediente',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

const goToApendixView = new ViewActions<FolioDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as FolioDto).id ,'documentLink'], {
      relativeTo: route,
    });
  },
  'contact_page',
  {
    tooltip: 'Ver apendice',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

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

export class AdvanceFilter {
  @formField({
    label: 'Instrumentos con error en folios',
    formFieldType: FormFieldType.CHECKBOX,
  })
  @viewLabel('Instrumentos con error en folios')
  only_errors: boolean;

  @formField({
    label: 'Instrumentos sin asignar a expediente',
    formFieldType: FormFieldType.CHECKBOX,
  })
  @viewLabel('Instrumentos sin asignar a expediente')
  only_unassigned: boolean;

  constructor(only_errors: boolean, only_unassigned: boolean) {
    this.only_errors = only_errors;
    this.only_unassigned = only_unassigned;
  }
}

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
@advancedFilters(AdvanceFilter)
@viewDialog('Información del Instrumento')
@viewCrud({
  classProvider: FolioService,
  registerName: 'Folios',
  route: DEFAULT_ROUTE_CONFIGURATION,
  actions: [goToErrorFolios, goToOrderInstruments, goToUnsetProcedure, goToApendixView],
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

  @dialogLabel('Errores en de folios en instrumento')
  @viewHTML((unused_folios: any) => {
    let html = '<br>';
    if (unused_folios) {
      for (let item in unused_folios) {
        html += `
        <b> Folio: </b> ${unused_folios[item].folio} <br>
        <b> Descripción: </b> ${unused_folios[item].comment} <br>
        <hr>
        `;
      }
    } else {
      html = `<span style="padding: 1rem; background: #0d2b3e; color: #eee ; border-radius: 10px; font-size: 1rem;">No hay errores en ningún folio de este instrumento</span>`;
    }

    return html;
  })
  unused_folios: [];

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
    unused_folios: [],
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
    this.unused_folios = unused_folios;
  }
}

export class AdvanceFilterOrder {
  @formField({
    label: 'Instrumentos no registrados',
    formFieldType: FormFieldType.CHECKBOX,
  })
  @viewLabel('Instrumentos no registrados')
  only_errors: boolean;

  @formField({
    label: 'Instrumentos sin expediente asignado',
    formFieldType: FormFieldType.CHECKBOX,
  })
  @viewLabel('Instrumentos sin expediente asignado')
  only_unassigned: boolean;

  constructor(only_errors: boolean, only_unassigned: boolean) {
    this.only_errors = only_errors;
    this.only_unassigned = only_unassigned;
  }
}
@advancedFilters(AdvanceFilterOrder)
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
      2: '#e1c418', //sin procedure
      3: '#f91a1a', //sin darse de alta
    };

    let html = '';

    if (procedure != null && procedure > 0)
      html = `<div style=" display: inline-block ;padding: 1.25rem; background: ${status[1]};margin-top: 1rem; border-radius: 50%"></div>`;

    if (procedure == null)
      html = `<div style=" display: inline-block ;padding: 1.25rem; background: ${status[2]};margin-top: 1rem; border-radius: 50%"></div>`;

    if (procedure == -1)
      html = `<div style=" display: inline-block ;padding: 1.25rem; background: ${status[3]};margin-top: 1rem; border-radius: 50%"></div>`;
    9;
    return html;
  })
  procedure_id: number | null;
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
