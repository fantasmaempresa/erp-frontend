import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper, ViewActions, ViewContextService, viewActions, viewLabel } from 'o2c_core';
import { DialogPreviewPdfComponent } from '../../shared/components/dialog-preview-pdf/dialog-preview-pdf.component';
import { DocumentDto } from '../dto';
import { DocumentApedixService, DocumentLinkService } from '../services/document-link.service';

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

const goToEditDocumentLink = new ViewActions<DocumentDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as DocumentDto).id, 'edit', (row as DocumentDto).pivot?.id], {
      relativeTo: route,
    });
  },
  'edit',
  {
    tooltip: 'Editar documento',
    color: 'primary',
    isVisible: (row) => row && row.id > 0,
  },
);

const goToDeleteDocumentLink = new ViewActions<DocumentDto>(
  async ({ row, injector }) => {
    const viewContextService = injector.get(ViewContextService);
    const deleteService = injector.get(DocumentLinkService);
    //@ts-ignore
    deleteService.delete((row as DocumentDto).pivot?.id).subscribe({
      next: async () => {
        await MessageHelper.successMessage(
          'Éxito',
          `${(row as DocumentDto).name} ha sido eliminado`
        );
        viewContextService.reloadView();
      },
    });
  },
  'delete',
  {
    isVisible: (row) => !!row,
    messageBeforeAction: `¿Deseas eliminar este Expediente digital?`,
  }
);

@viewActions({
  classProvider: DocumentLinkService,
  actions: [
    ViewActions.ACTION_ADD('../new'),
    goToDeleteDocumentLink,
    goToViewDocument,
    goToEditDocumentLink,
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

@viewActions({
  classProvider: DocumentApedixService,
  actions: [
    // ViewActions.ACTION_ADD('../new'),
    // goToDeleteDocumentLink,
    goToViewDocument,
    // goToEditDocumentLink,
  ],
})
export class DocumentApendixView extends DocumentLinkView {
}
