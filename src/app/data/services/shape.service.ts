import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { ShapeDto } from '../dto/Shape.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShapeService extends CrudService<ShapeDto, Pagination<ShapeDto>> {
  constructor() {
    super('shape');
  }

  generateShape(procedure: number) {
    return this._http.get(
      `${environment.base_url}/shape/generator/01/${procedure}`,
      {
        responseType: 'blob',
        observe: 'response',
      },
    );
  }
}
