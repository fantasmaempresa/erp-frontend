import { Injectable } from '@angular/core';
import { DocumentDto } from '../dto';
import { CrudService, Pagination } from 'o2c_core';

@Injectable({
  providedIn: 'root',
})
export class DocumentService extends CrudService<
  DocumentDto,
  Pagination<DocumentDto>
> {
  constructor() {
    super('documents');
  }
}
