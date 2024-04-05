import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { RateDto } from '../dto/Rate.dto';

@Injectable({
  providedIn: 'root',
})
export class RateService extends CrudService<RateDto, Pagination<RateDto>> {
  constructor() {
    super('rate');
  }
}
