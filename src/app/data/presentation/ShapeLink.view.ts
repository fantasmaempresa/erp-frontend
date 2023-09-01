import { MessageHelper, viewActions, ViewActions, viewLabel } from "o2c_core";
import { ShapeService } from "../services/shape.service";
import { ShapeDto } from "../dto/Shape.dto";
import { ShapeLinkService } from "../services/shape-link.service";

const generetePdf = new ViewActions<ShapeDto>(
  async ({ row, injector }) => {
    const shape = row as ShapeDto;
    const shapeService = injector.get(ShapeService);

    MessageHelper.showLoading('Generando pdf');

    shapeService.generateShape(shape.procedure_id).subscribe({
      next: async (response) => {
        // @ts-ignore
        const blob = new Blob([response.body], {
          type: response.headers.get('content-type'),
        });
        // @ts-ignore
        const filename = 'forma-pdf';

        // Crea un enlace temporal y simula un clic para descargar el archivo
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
        await MessageHelper.successMessage(
          'Reporte Generado',
          'El reporte se genero con éxito',
        );
      },
      error: async () => {
        await MessageHelper.errorMessage(
          'No se puede generar el pdf en este momento intente más tarde',
        );
      },
    });
  },
  'download',
  {
    tooltip: 'Generar PDF',
    color: 'accent',
    isVisible: (row: ShapeDto) => row.id !== null,
  },
);

@viewActions({
  classProvider: ShapeLinkService,
  // registerName: 'Formas',
  // route: DEFAULT_ROUTE_CONFIGURATION,
  actions: [generetePdf],
})
export class ShapeLinkView {
  @viewLabel('Folio')
  folio: string;

  // @viewLabel('notary')
  notary: string;

  @viewLabel('Escritura')
  scriptures: string;

  @viewLabel('Cuenta Predial')
  property_account: string;

  @viewLabel('Fecha de firma')
  signature_date: string;

  // @viewLabel('departure')
  departure: string;

  // @viewLabel('inscription')
  inscription: string;

  @viewLabel('Fojas')
  sheets: string;

  @viewLabel('Tomo')
  took: string;

  @viewLabel('Libro')
  book: string;

  @viewLabel('Monto de operación')
  operation_value: string;

  // @viewLabel('alienating_name')
  alienating_name: string;

  // @viewLabel('alienating_street')
  alienating_street: string;

  // @viewLabel('alienating_outdoor_number')
  alienating_outdoor_number: string;

  // @viewLabel('alienating_interior_number')
  alienating_interior_number: string;

  // @viewLabel('alienating_colony')
  alienating_colony: string;

  // @viewLabel('alienating_locality')
  alienating_locality: string;

  // @viewLabel('alienating_municipality')
  alienating_municipality: string;

  // @viewLabel('alienating_entity')
  alienating_entity: string;

  // @viewLabel('alienating_zipcode')
  alienating_zipcode: string;

  // @viewLabel('alienating_phone')
  alienating_phone: string;

  @viewLabel('Nombre de adquiriente')
  acquirer_name: string;

  // @viewLabel('description')
  description: string;

  // @viewLabel('total')
  total: string;

  // @viewLabel('data_form')
  data_form: [];

  // @viewLabel('template_shape_id')
  template_shape_id: number;

  // @viewLabel('procedure_id')
  procedure_id: number;

  constructor(
    folio: string,
    notary: string,
    scriptures: string,
    property_account: string,
    signature_date: string,
    departure: string,
    inscription: string,
    sheets: string,
    took: string,
    book: string,
    operation_value: string,
    alienating_name: string,
    alienating_street: string,
    alienating_outdoor_number: string,
    alienating_interior_number: string,
    alienating_colony: string,
    alienating_locality: string,
    alienating_municipality: string,
    alienating_entity: string,
    alienating_zipcode: string,
    alienating_phone: string,
    acquirer_name: string,
    description: string,
    total: string,
    data_form: [],
    template_shape_id: number,
    procedure_id: number,
  ) {
    this.folio = folio;
    this.notary = notary;
    this.scriptures = scriptures;
    this.property_account = property_account;
    this.signature_date = signature_date;
    this.departure = departure;
    this.inscription = inscription;
    this.sheets = sheets;
    this.took = took;
    this.book = book;
    this.operation_value = operation_value;
    this.alienating_name = alienating_name;
    this.alienating_street = alienating_street;
    this.alienating_outdoor_number = alienating_outdoor_number;
    this.alienating_interior_number = alienating_interior_number;
    this.alienating_colony = alienating_colony;
    this.alienating_locality = alienating_locality;
    this.alienating_municipality = alienating_municipality;
    this.alienating_entity = alienating_entity;
    this.alienating_zipcode = alienating_zipcode;
    this.alienating_phone = alienating_phone;
    this.acquirer_name = acquirer_name;
    this.description = description;
    this.total = total;
    this.data_form = data_form;
    this.template_shape_id = template_shape_id;
    this.procedure_id = procedure_id;
  }
}
