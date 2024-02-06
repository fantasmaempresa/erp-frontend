import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { StakeDto } from '../dto/Stake.dto';

@Injectable({
  providedIn: 'root',
})
export class StakeService extends CrudService<StakeDto, Pagination<StakeDto>> {
  constructor() {
    super('stake');
  }
}
