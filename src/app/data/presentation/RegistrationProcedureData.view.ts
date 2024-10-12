import { MatDialog } from '@angular/material/dialog';
import {
  FormFieldType,
  MessageHelper,
  ViewActions,
  ViewContextService,
  dialogLabel,
  formField,
  formTable,
  viewActions,
  viewDialog,
  viewHTML,
  viewLabel,
  viewMapTo,
} from 'o2c_core';
import { DialogPreviewPdfComponent } from 'src/app/shared/components/dialog-preview-pdf/dialog-preview-pdf.component';
import { DocumentDto, UserDto } from '../dto';
import { PlaceDto } from '../dto/Place.dto';
import { RegistrationProcedureDataDto } from '../dto/RegistrationProcedureData.dto';
import { RegistrationProcedureDataPhaseService, RegistrationProcedureDataService } from '../services/registration-procedure-data.service';
import { ActivatedRoute, Router } from '@angular/router';

const goToViewDocument = new ViewActions<RegistrationProcedureDataDto>(
  async ({ row, injector }) => {
    const document = row as RegistrationProcedureDataDto;
    const dialog = injector.get(MatDialog);
    if (document.url_file == null || document.url_file == '') {
      MessageHelper.errorMessage(
        'Este registro no tiene documento para mostrar',
        'Documento de registro',
      );
    } else {
      dialog.open(DialogPreviewPdfComponent, {
        data: {
          name: document.inscription,
          file: document.url_file,
        },
      });
    }
  },
  'visibility',
  {
    tooltip: 'Ver documento',
    color: 'accent',
    isVisible: (row: RegistrationProcedureDataDto) => row.url_file !== null,
  },
);

const goToDelete = new ViewActions<RegistrationProcedureDataDto>(
  async ({ row, injector }) => {
    const viewContextService = injector.get(ViewContextService);
    const deleteService = injector.get(RegistrationProcedureDataService);
    //@ts-ignore
    deleteService.delete((row as RegistrationProcedureDataDto).id).subscribe({
      next: async () => {
        viewContextService.reloadView();
        await MessageHelper.successMessage(
          'Éxito',
          `${(row as RegistrationProcedureDataDto).date} ha sido eliminado`,
        );
      },
    });
  },
  'delete',
  {
    isVisible: (row) => !!row,
    messageBeforeAction: `¿Deseas eliminar este Registro?`,
  },
);

export class RegisterData {
  @formField({
    label: 'Inscripción',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Inscripción')
  inscription: string;

  @formField({
    label: 'Fojas',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Fojas')
  sheets: string;

  @formField({
    label: 'Tomo',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Tomo')
  took: string;

  @formField({
    label: 'Libro',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Libro')
  book: string;

  @formField({
    label: 'Partida',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Partida')
  departure: string;

  @formField({
    label: 'Folio Real Inmobiliario',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Folio Real Inmobiliario')
  folio_real_estate: string;
  

  @formField({
    label: 'Folio Real Mercantil',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Folio Real Mercantil')
  folio_electronic_merchant: string;

  @formField({
    label: 'NCI',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('NCI')
  nci: string;

  constructor(
    inscription: string,
    sheets: string,
    took: string,
    book: string,
    departure: string,
    folio_real_estate: string,
    folio_electronic_merchant: string,
    nci: string,
  ) {
    this.inscription = inscription;
    this.sheets = sheets;
    this.took = took;
    this.book = book;
    this.departure = departure;
    this.folio_real_estate = folio_real_estate;
    this.folio_electronic_merchant = folio_electronic_merchant;
    this.nci = nci;
  }
}

export class RegisterDataTable {
  @formTable({
    tableProvider: RegisterData,
  })
  @formField({
    label: 'Datos de Registro',
    formFieldType: FormFieldType.TABLE,
  })
  data: string;

  constructor(data: string) {
    this.data = data;
  }
}

@viewDialog('Información del los datos de registro')
@viewActions({
  classProvider: RegistrationProcedureDataService,
  // registerName: 'Información de registro',
  actions: [
    ViewActions.ACTION_ADD('../new'),
    ViewActions.ACTION_EDIT('../'),
    goToDelete,
    goToViewDocument,
  ],
  // route: DEFAULT_ROUTE_CONFIGURATION,
})
export class RegistrationProcedureDataView {
  @viewLabel('Fecha')
  date: string;

  url_file: string;

  @viewLabel('Usuario')
  @viewMapTo((value: any) => value?.name)
  user: UserDto;

  @viewLabel('Documento')
  @viewMapTo((value: any) => value?.name)
  document: DocumentDto;

  @viewLabel('Lugar')
  @viewMapTo((value: any) => value?.name)
  place: PlaceDto;

  //   @viewLabel('Comentario')
  description: string;
  
  @dialogLabel('')
  @viewHTML((registers: any) => {
    let html: string = '<br>';
    // @ts-ignore
    for (let register of registers) {
      
        html += `<p><b>Inscripción:</b> ${register.inscription}</p>`;
        html += `<p><b>Fojas:</b> ${register.sheets}</ p>`;
        html += `<p><b>Tomo:</b> ${register.took}</p>`;
        html += `<p><b>Libro:</b> ${register.book}</ p>`;
        html += `<p><b>Partida:</b> ${register.departure}</p>`;
        html += `<p><b>Folio Real inmobiliario:</b> ${register.folio_real_estate}</p>`;
        html += `<p><b>Folio Electronico Mercantil:</b> ${register.folio_electronic_merchant}</p>`;
        html += `<p><b>NCI:</b> ${register.nci}</p>`;
        html += `<hr><br>`;
    }
    return html;
    
        
        
        
        
        
        
        
  })
  data: [];

  constructor(
    date: string,
    // inscription: string,
    // sheets: string,
    // took: string,
    // book: string,
    // departure: string,
    // folio_real_estate: string,
    // folio_electronic_merchant: string,
    // nci: string,
    description: string,
    url_file: string,
    user: UserDto,
    document: DocumentDto,
    place: PlaceDto,
    data: [],
  ) {
    this.date = date;
    // this.inscription = inscription;
    // this.sheets = sheets;
    // this.took = took;
    // this.book = book;
    // this.departure = departure;
    // this.folio_real_estate = folio_real_estate;
    // this.folio_electronic_merchant = folio_electronic_merchant;
    // this.nci = nci;
    this.description = description;
    this.url_file = url_file;
    // this.document_id = document_id;
    // this.procedure_id = procedure_id;
    // this.place_id = place_id;
    // this.user_id = user_id;
    this.user = user;
    this.document = document;
    this.place = place;
    this.data = data;
  }
}

const goToNew = new ViewActions<RegistrationProcedureDataDto>(
  async ({ row, injector }) => {
    let procedure_id = localStorage.getItem('phase_procedure_id');
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['./registrationData', procedure_id, 'new'], {
      relativeTo: route,
    });
  },
  'add',
  {
    tooltip: 'Agregar gestión',
    color: 'primary',
    isVisible: (row: RegistrationProcedureDataDto) => true,
  },
);

const goToEdit = new ViewActions<RegistrationProcedureDataDto>(
  async ({ row, injector }) => {
    let procedure_id = localStorage.getItem('phase_procedure_id');
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['./registrationData', procedure_id, (row as RegistrationProcedureDataDto).id], {
      relativeTo: route,
    });
  },
  'edit',
  {
    tooltip: 'Editar dato de registro',
    color: 'primary',
    isVisible: (row: RegistrationProcedureDataDto) => row && row.id > 0,
  },
);

@viewDialog('Información del los datos de registro')
@viewActions({
  classProvider: RegistrationProcedureDataPhaseService,
  // registerName: 'Información de registro',
  actions: [
    goToNew,
    goToEdit,
    goToDelete,
    goToViewDocument,
  ],
  // route: DEFAULT_ROUTE_CONFIGURATION,
})
export class RegistrationProcedureDataPhaseView extends RegistrationProcedureDataView {}