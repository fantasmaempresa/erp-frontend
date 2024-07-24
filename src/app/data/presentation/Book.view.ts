import { viewCrud, viewLabel } from 'o2c_core';
import { BookServiceService } from '../services/book-service.service';
import { DEFAULT_ROUTE_CONFIGURATION } from 'src/app/core/constants/routes.constants';

@viewCrud({
  classProvider: BookServiceService,
  registerName: 'Trámites',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class BookView {
  @viewLabel('Libro')
  name: string;

  @viewLabel('Del Folio')
  folio_min: number;

  @viewLabel('Al Folio')
  folio_max: number;

  @viewLabel('Fecha de solicitud')
  date_proceeding: Date;

  constructor(
    name: string,
    folio_min: number,
    folio_max: number,
    date_proceeding: Date,
  ) {
    this.name = name;
    this.folio_min = folio_min;
    this.folio_max = folio_max;
    this.date_proceeding = date_proceeding;
  }
}
