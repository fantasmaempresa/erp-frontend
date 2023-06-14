import { viewCrud, viewLabel } from "o2c_core";
import { DocumentService } from "../services/document.service";
import { DEFAULT_ROUTE_CONFIGURATION } from "../../core/constants/routes.constants";


@viewCrud({
  classProvider: DocumentService,
  registerName: "Documento",
  route: DEFAULT_ROUTE_CONFIGURATION
})
export class DocumentView {
  @viewLabel("Nombre")
  name: string;

  @viewLabel("Descripción")
  description: string;

  @viewLabel("Costo")
  quote: string;

  url: string;

  constructor(
    name: string,
    description: string,
    quote: string,
    url: string
  ) {
    this.name = name;
    this.description = description;
    this.quote = quote;
    this.url = url;
  }
}
