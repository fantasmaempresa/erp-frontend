import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { ProcedureDto } from '../dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProcedureService extends CrudService<
  ProcedureDto,
  Pagination<ProcedureDto>
> {
  constructor() {
    super('procedures');
  }

  checkValueUnique(name: string, id?: number) {
    let idParam = '';
    if (id) {
      idParam = `&id=${id}`;
    }
    return this._http.get(
      `${environment.base_url}/procedure/validator/uniqueValue/${name}?${idParam}`,
    );
  }

  checkFolioMinValueUnique(folio: number, range: string, id?: number) {
    let idParam = '';
    if (id) {
      idParam = `&id=${id}`;
    }
    return this._http.get(
      `${environment.base_url}/procedure/validator/uniqueFolioValue/${folio}?range=${range}${idParam}`,
    );
  }
}
