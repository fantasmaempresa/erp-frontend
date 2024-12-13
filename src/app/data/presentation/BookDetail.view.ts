import {
  MessageHelper,
  ViewActions,
  viewActions,
  ViewContextService,
  viewHTML,
  viewLabel,
  viewMapTo,
} from 'o2c_core';
import { BookDetailService } from '../services/book-service.service';
import { ProcedureDto } from '../dto';
import { FolioService } from '../services/folio-service.service';

const checkToIntegrateAppendix = new ViewActions<any>(
  async ({ row, injector }) => {
    const folioService = injector.get(FolioService);
    MessageHelper.showLoading();
    folioService.checkApendix(row.id).subscribe({
      next: async (response) => {
        MessageHelper.successMessage('Éxito','Se confirmo la integración del apendice correctamente');
        const viewContextService = injector.get(ViewContextService);
        viewContextService.reloadView();
      },
      error: (error) => {
        MessageHelper.errorMessage('No se puede realizar la operación en este momento');
      },
    });
  },
  'done_all',
  {
    tooltip: 'Validar apendice',
    color: 'accent',
    isVisible: (row) => row?.id,
  },
);

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
  actions: [viewResume, checkToIntegrateAppendix],
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
  @viewMapTo((value: any) => value == "" ? 'Folios libres' : value)
  name: string;

  @viewLabel('Del Folio')
  folio_min: number;

  @viewLabel('Al folio')
  folio_max: number;

  @viewLabel('Expediente')
  @viewMapTo((value: any) => value?.name ?? 'Expediente desconocido')
  procedure: ProcedureDto;

  @viewLabel('Apendice integrado')
  @viewHTML((value) => {
    let color = '';
    switch (value) {
      case 0: color = '#f91a1a'; break; //Sin Integrase
      case 1: color = '#3be30e'; break;//Integrado
      default: color = '#b2b5b1';
    }
    // @ts-ignore
    return `<div style=" display: inline-block ;padding: 1.25rem; background: ${color};margin-top: 1rem; border-radius: 50%"></div>`;
  })
  integrate_appendix: number;

  constructor(
    color: number,
    name: string,
    folio_min: number,
    folio_max: number,
    procedure: ProcedureDto,
    integrate_appendix: number,
  ) {
    this.color = color;
    this.name = name;
    this.folio_min = folio_min;
    this.folio_max = folio_max;
    this.procedure = procedure;
    this.integrate_appendix = integrate_appendix;
  }
}

