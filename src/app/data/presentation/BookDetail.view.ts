import {
  MessageHelper,
  ViewActions,
  viewActions,
  viewDialog,
  viewHTML,
  viewLabel,
  viewMapTo,
} from 'o2c_core';
import { BookDetailService } from '../services/book-service.service';

const viewResume = new ViewActions<any>(
  async ({ row, injector }) => {
    const detail_service = injector.get(BookDetailService);
    detail_service.getGeneralCount().subscribe({
      next: (response: any) => {
        console.log('response response', response);
        MessageHelper.infoMessage(`Folios usados: ${response.folios_used_count}, Folios sin usar: ${response.folios_unused_count}, Folios sin proceso: ${response.folios_without_procedure_count}`);        
      }
    });
  },
  'info',
  {
    tooltip: 'Detalle de folios',
    color: 'accent',
    isVisible: (row) => true,
  },
);

@viewActions({
  classProvider: BookDetailService,
  //   registerName: 'Detalle de libro',
  actions: [viewResume],
})
export class BookDetailView {
  @viewLabel('Estado')
  @viewHTML((color) => {
    const status = {
      1: '#3be30e', //Procedure
      2: '#e1c418', //Sin procedure
      3: '#f91a1a', //sin darse de alta
    };
    // @ts-ignore
    return `<div style=" display: inline-block ;padding: 1.25rem; background: ${status[color]};margin-top: 1rem; border-radius: 50%"></div>`;
  })
  color: number;

  @viewLabel('Instrumento')
  name: string;

  @viewLabel('Del Folio')
  folio_min: number;

  @viewLabel('Al folio')
  folio_max: number;

  @viewLabel('expediente')
  procedure__name: string;

  constructor(
    color: number,
    name: string,
    folio_min: number,
    folio_max: number,
    procedure__name: string,
  ) {
    this.color = color;
    this.name = name;
    this.folio_min = folio_min;
    this.folio_max = folio_max;
    this.procedure__name = procedure__name;
  }
}
