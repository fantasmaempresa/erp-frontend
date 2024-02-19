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

  /**
   * 
   * @param shape_id 
   * @param reportExtension | 1 pdf | 2 word | 3 excel 
   * @returns 
   */
  generateShape(shape_id: number, reportExtension: number = 1) {
    
    return this._http.get(
      `${environment.base_url}/report/generator/procedure/shape/${shape_id}?reportExtension=${reportExtension}`,
      {
        responseType: 'blob',
        observe: 'response',
      },
    );
  }
}
