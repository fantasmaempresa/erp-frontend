import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { BookDto } from '../dto/Book.dto';

@Injectable({
  providedIn: 'root',
})
export class BookServiceService extends CrudService<
  BookDto,
  Pagination<BookDto>
> {
  constructor() {
    super('book');
  }

}
