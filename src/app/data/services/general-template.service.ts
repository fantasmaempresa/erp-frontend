import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { GeneralTemplateDto } from '../dto/GeneralTemplate.dto';

@Injectable({
  providedIn: 'root',
})
export class GeneralTemplateService extends CrudService<
  GeneralTemplateDto,
  Pagination<GeneralTemplateDto>
> {
  constructor() {
    super('generalTemplate');
  }
}
