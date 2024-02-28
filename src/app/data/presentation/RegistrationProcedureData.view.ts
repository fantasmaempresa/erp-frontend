import { MatDialog } from '@angular/material/dialog';
import { MessageHelper, ViewActions, viewCrud, viewLabel, viewMapTo } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from 'src/app/core/constants/routes.constants';
import { DialogPreviewPdfComponent } from 'src/app/shared/components/dialog-preview-pdf/dialog-preview-pdf.component';
import { DocumentDto, UserDto } from '../dto';
import { PlaceDto } from '../dto/Place.dto';
import { RegistrationProcedureDataDto } from '../dto/RegistrationProcedureData.dto';
import { RegistrationProcedureDataService } from '../services/registration-procedure-data.service';

const goToViewDocument = new ViewActions<RegistrationProcedureDataDto>(
  async ({ row, injector }) => {
    const document = row as RegistrationProcedureDataDto;
    const dialog = injector.get(MatDialog);
    if(document.url_file == null || document.url_file == '') {
      MessageHelper.errorMessage('Este registro no tiene documento para mostrar', 'Documento de registro');
    }else {
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

@viewCrud({
  classProvider: RegistrationProcedureDataService,
  registerName: 'Información de registro',
  actions: [
    goToViewDocument,
  ],
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class RegistrationProcedureDataView {
  @viewLabel('Incripción')
  inscription: string;
  @viewLabel('Fojas')
  sheets: string;
  @viewLabel('Tomo')
  took: string;
  @viewLabel('libro')
  book: string;
  @viewLabel('Fecha')
  date: string;

  @viewLabel('Partida')
  departure: string;
  @viewLabel('Folio real inmobiliario')
  folio_real_estate: string;
  @viewLabel('Folio Electronico Mercantil')
  folio_electronic_merchant: string;
  @viewLabel('NCI')
  nci: string;

  url_file: string;
//   procedure_id: number;
//   document_id: number;
//   user_id: number;

  @viewLabel('Usuario')
  @viewMapTo((value: any) => value?.name)
  user: UserDto;

//   @viewLabel('Documento')
//   @viewMapTo((value: any) => value?.name)
  document: DocumentDto;
  
  @viewLabel('Lugar')
  @viewMapTo((value: any) => value?.name)
  place: PlaceDto;

//   @viewLabel('Comentario')
  description: string;

  constructor(
    date: string,
    inscription: string,
    sheets: string,
    took: string,
    book: string,
    departure: string,
    folio_real_estate: string,
    folio_electronic_merchant: string,
    nci: string,
    description: string,
    url_file: string,
    user: UserDto,
    document: DocumentDto,
    place: PlaceDto,
  ) {
    this.date = date;
    this.inscription = inscription;
    this.sheets = sheets;
    this.took = took;
    this.book = book;
    this.departure = departure;
    this.folio_real_estate = folio_real_estate;
    this.folio_electronic_merchant = folio_electronic_merchant;
    this.nci = nci;
    this.description = description;
    this.url_file = url_file;
    // this.document_id = document_id;
    // this.procedure_id = procedure_id;
    // this.place_id = place_id;
    // this.user_id = user_id;
    this.user = user;
    this.document = document;
    this.place = place;
  }
}
