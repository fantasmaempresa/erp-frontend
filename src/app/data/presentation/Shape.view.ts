import { MessageHelper, viewActions, ViewActions, viewCrud, viewLabel } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { ShapePhaseService, ShapeService } from '../services/shape.service';
import { ShapeDto } from '../dto/Shape.dto';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

const generetePdf = new ViewActions<ShapeDto>(
  async ({ row, injector }) => {
    const shape = row as ShapeDto;
    const shapeService = injector.get(ShapeService);

    const callback = (type : number) => {
      Swal.showLoading();
      shapeService.generateShape(shape.id, type).subscribe({
        next: async (response) => {
          // @ts-ignore
          const blob = new Blob([response.body], {
            type: response.headers.get('content-type'),
          });
          const extension = type == 2 ? '.rft' : '';
          // @ts-ignore
          const filename = 'forma-' + shape.folio + extension;
          
  
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
            'No se puede generar el reporte en este momento intente más tarde',
          );
        },
      });
    };

    MessageHelper.decisionMessage(
      'Generar formato', 
      '¿Desea generar en formato .docx (Formato editable con word)?',
      callback.bind(this, 2),
      callback.bind(this, 1),
      );

  },
  'download',
  {
    tooltip: 'Generar PDF',
    color: 'accent',
    isVisible: (row: ShapeDto) => row && row.id !== null,
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

  @viewLabel('Instrumento')
  scriptures: string;

  @viewLabel('Cuenta Predial')
  property_account: string;

  @viewLabel('Fecha de firma')
  signature_date: string;

  // @viewLabel('departure')
  departure: string;

  // @viewLabel('inscription')
  inscription: string;

  // @viewLabel('Fojas')
  sheets: string;

  // @viewLabel('Tomo')
  took: string;

  // @viewLabel('Libro')
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

const newShapePhase = new ViewActions<ShapeDto>(
  async ({ row, injector }) => {
    let procedure_id = localStorage.getItem('phase_procedure_id');
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['./shapes', procedure_id, 'new'], {
      relativeTo: route,
    });
  },
  'add',
  {
    tooltip: 'Agregar forma',
    color: 'primary',
    isVisible: (row: ShapeDto) => true,
  },
);


const editShapePhase = new ViewActions<ShapeDto>(
  async ({ row, injector }) => {
    let procedure_id = localStorage.getItem('phase_procedure_id');
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['./shapes', procedure_id, (row as ShapeDto).id], {
      relativeTo: route,
    });
  },
  'edit',
  {
    tooltip: 'Editar forma',
    color: 'primary',
    isVisible: (row: ShapeDto) => row && row.id > 0,
  },
);

@viewActions({
  classProvider: ShapePhaseService,
  actions: [newShapePhase, editShapePhase, generetePdf ],
})
export class ShapePhaseView extends ShapeView {

}