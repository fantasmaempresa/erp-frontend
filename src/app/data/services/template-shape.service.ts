import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { TemplateShapeDto } from '../dto/TemplateShape.dto';

@Injectable({
  providedIn: 'root',
})
export class TemplateShapeService extends CrudService<
  TemplateShapeDto,
  Pagination<TemplateShapeDto>
> {
  constructor() {
    super('templateShape');
  }
}
