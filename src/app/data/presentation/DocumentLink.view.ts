import { ViewActions, viewActions, viewCrud, viewLabel } from "o2c_core";
import { DEFAULT_ROUTE_CONFIGURATION } from "../../core/constants/routes.constants";
import { DocumentLinkService } from "../services/document-link.service";
import { ClientDto, DocumentDto } from "../dto";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogPreviewPdfComponent } from "../../shared/components/dialog-preview-pdf/dialog-preview-pdf.component";
import { DocumentView } from "./Document.view";


const goToViewDocument = new ViewActions<DocumentDto>(
  async ({ row, injector }) => {
    console.log('rowww --> ', row);
    const document = (row as DocumentDto);
    const dialog = injector.get(MatDialog);
    dialog.open(DialogPreviewPdfComponent, {
      data: {
        name: document.name,
        file: document.url,
      },
    });
  },
  "visibility",
  {
    tooltip: "Ver documento",
    color: "accent",
    isVisible: (row: DocumentDto) => row.url !== null,
  }
);

@viewActions({
  classProvider: DocumentLinkService,
  // route: DEFAULT_ROUTE_CONFIGURATION,
  // registerName: 'Expediente',
  actions: [ViewActions.ACTION_ADD("../new"), ViewActions.ACTION_DELETE(DocumentLinkService), goToViewDocument]
})
export class DocumentLinkView {
  @viewLabel("Nombre")
  name: string;

  @viewLabel("Descripción")
  description: string;

  @viewLabel("Costo")
  quote: string;

  constructor(
    name: string,
    description: string,
    quote: string
  ) {
    this.name = name;
    this.description = description;
    this.quote = quote;

  }

}
