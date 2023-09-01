import { ViewActions, viewActions, viewLabel } from 'o2c_core';
import { DocumentLinkService } from '../services/document-link.service';
import { DocumentDto } from '../dto';
import { MatDialog } from '@angular/material/dialog';
import { DialogPreviewPdfComponent } from '../../shared/components/dialog-preview-pdf/dialog-preview-pdf.component';

const goToViewDocument = new ViewActions<DocumentDto>(
  async ({ row, injector }) => {
    const document = row as DocumentDto;
    const dialog = injector.get(MatDialog);
    dialog.open(DialogPreviewPdfComponent, {
      data: {
        name: document.name,
        file: document.url,
      },
    });
  },
  'visibility',
  {
    tooltip: 'Ver documento',
    color: 'accent',
    isVisible: (row: DocumentDto) => row.url !== null,
  },
);

@viewActions({
  classProvider: DocumentLinkService,
  // route: DEFAULT_ROUTE_CONFIGURATION,
  // registerName: 'Expediente',
  actions: [
    ViewActions.ACTION_ADD('../new'),
    ViewActions.ACTION_DELETE(DocumentLinkService),
    goToViewDocument,
  ],
})
export class DocumentLinkView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Descripción')
  description: string;

  @viewLabel('Costo')
  quote: string;

  url: string;

  constructor(name: string, description: string, quote: string, url: string) {
    this.name = name;
    this.description = description;
    this.quote = quote;
    this.url = url;
  }
}
