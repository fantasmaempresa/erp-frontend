import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { ShapeDto } from '../dto/Shape.dto';

@Injectable({
  providedIn: 'root',
})
export class ShapeService extends CrudService<ShapeDto, Pagination<ShapeDto>> {
  constructor() {
    super('shape');
  }
}
