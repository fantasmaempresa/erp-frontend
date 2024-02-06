import { MessageHelper, ViewActions, viewCrud, viewLabel } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { ShapeService } from '../services/shape.service';
import { ShapeDto } from '../dto/Shape.dto';

const generetePdf = new ViewActions<ShapeDto>(
  async ({ row, injector }) => {
    const shape = row as ShapeDto;
    const shapeService = injector.get(ShapeService);

    MessageHelper.showLoading('Generando pdf');

    shapeService.generateShape(shape.id).subscribe({
      next: async (response) => {
        // @ts-ignore
        const blob = new Blob([response.body], {
          type: response.headers.get('content-type'),
        });
        // @ts-ignore
        const filename = 'forma-pdf-' + shape.folio;

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

@viewCrud({
  classProvider: ShapeService,
  registerName: 'Formas',
  route: DEFAULT_ROUTE_CONFIGURATION,
  actions: [generetePdf],
})
export class ShapeView {
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
    this.description = description;
    this.total = total;
    this.data_form = data_form;
    this.template_shape_id = template_shape_id;
    this.procedure_id = procedure_id;
  }
}
