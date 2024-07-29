import { viewCrud, viewLabel, viewMapTo } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from 'src/app/core/constants/routes.constants';
import { ProcedureDto, UserDto } from '../dto';
import { BookDto } from '../dto/Book.dto';
import { FolioDialogService } from '../services/folio-service.service';

@viewCrud({
  classProvider: FolioDialogService,
  registerName: 'Folios',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class FolioDialogView {
  @viewLabel('Instrumento')
  name: string;
  @viewLabel('Del Folio')
  folio_min: number;
  @viewLabel('Al Folio')
  folio_max: number;
  book_id: number;
  procedure_id: number;
  user_id: number;
  @viewLabel('Usuario que registro')
  @viewMapTo((value: any) => value.email)
  user: UserDto;
  book: BookDto;

  constructor(
    name: string,
    folio_min: number,
    folio_max: number,
    book_id: number,
    procedure_id: number,
    user_id: number,
    user: UserDto,
    book: BookDto,
  ) {
    this.name = name;
    this.folio_min = folio_min;
    this.folio_max = folio_max;
    this.book_id = book_id;
    this.procedure_id = procedure_id;
    this.user_id = user_id;
    this.user = user;
    this.book = book;
  }
}
