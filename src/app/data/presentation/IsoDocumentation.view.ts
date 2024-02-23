import { MatDialog } from '@angular/material/dialog';
import {
    ViewActions,
    viewActions,
    viewLabel
} from 'o2c_core';
import { DialogPreviewPdfComponent } from 'src/app/shared/components/dialog-preview-pdf/dialog-preview-pdf.component';
import { IsoDocumentationDto } from '../dto/IsoDocumentation.dto';
import { IsoDocumentationService } from '../services/iso-documentation.service';

const goToViewDocument = new ViewActions<IsoDocumentationDto>(
  async ({ row, injector }) => {
    const document = row as IsoDocumentationDto;
    const dialog = injector.get(MatDialog);
    dialog.open(DialogPreviewPdfComponent, {
      data: {
        name: document.name,
        file: document.file,
      },
    });
  },
  'visibility',
  {
    tooltip: 'Ver documento',
    color: 'accent',
    isVisible: (row: IsoDocumentationDto) => row.file !== null,
  },
);

@viewActions({
  classProvider: IsoDocumentationService,
  // registerName: 'Información de registro',
  actions: [ViewActions.ACTION_ADD('../new'), goToViewDocument],
  // route: DEFAULT_ROUTE_CONFIGURATION,
})
export class IsoDocumentationView {
  @viewLabel('Incripción')
  name: string;
  @viewLabel('Fojas')
  rule: string;
  @viewLabel('Tomo')
  description: string;

  constructor(name: string, rule: string, description: string) {
    this.name = name;
    this.rule = rule;
    this.description = description;
  }
}
