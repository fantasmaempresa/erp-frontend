import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { FolioDto } from '../dto/Folio.dto';

@Injectable({
  providedIn: 'root',
})
export class FolioService extends CrudService<
  FolioDto,
  Pagination<FolioDto>
> {
  constructor() {
    super('folio');
  }
}
