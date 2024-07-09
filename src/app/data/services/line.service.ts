import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { LineDto } from '../dto/Line.dto';

@Injectable({
  providedIn: 'root'
})
export class LineService extends CrudService<
  LineDto,
  Pagination<LineDto>
> {
  constructor() {
    super('line');
  }
}
