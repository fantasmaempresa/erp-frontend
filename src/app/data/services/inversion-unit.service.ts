import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { InversionUnitDto } from '../dto/InversionUnit.dto';

@Injectable({
  providedIn: 'root'
})
export class InversionUnitService extends CrudService<
  InversionUnitDto,
  Pagination<InversionUnitDto>
>{

  constructor() {
    super('inversionUnit');
   }
}
