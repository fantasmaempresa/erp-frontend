import { ViewActions, viewCrud, viewLabel } from 'o2c_core';
import { BookServiceService } from '../services/book-service.service';
import { DEFAULT_ROUTE_CONFIGURATION } from 'src/app/core/constants/routes.constants';
import { BookDto } from '../dto/Book.dto';
import { ActivatedRoute, Router } from '@angular/router';

const goToBookDetail = new ViewActions<BookDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../','bookDetail',(row as BookDto).id], {
      relativeTo: route,
    });
  },
  'info',
  {
    tooltip: 'Detalle de folios',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

const goToDocumentsLink = new ViewActions<BookDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as BookDto).id, 'documentsLink'], {
      relativeTo: route,
    });
  },
  'contact_page',
  {
    tooltip: 'Expediente de trámite',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

@viewCrud({
  classProvider: BookServiceService,
  registerName: 'Trámites',
  route: DEFAULT_ROUTE_CONFIGURATION,
  actions: [goToBookDetail, goToDocumentsLink],
})
export class BookView {
  @viewLabel('Libro')
  name: string;

  @viewLabel('Del Folio')
  folio_min: number;

  @viewLabel('Al Folio')
  folio_max: number;

  @viewLabel('Fecha de solicitud')
  date_proceedings: Date;

  constructor(
    name: string,
    folio_min: number,
    folio_max: number,
    date_proceedings: Date,
  ) {
    this.name = name;
    this.folio_min = folio_min;
    this.folio_max = folio_max;
    this.date_proceedings = date_proceedings;
  }
}
