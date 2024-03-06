import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { NationalConsumerPriceIndexDto } from '../dto/NationalConsumerPriceIndex.dto';

@Injectable({
  providedIn: 'root',
})
export class NationalConsumerPriceIndexService extends CrudService<
  NationalConsumerPriceIndexDto,
  Pagination<NationalConsumerPriceIndexDto>
> {
  constructor() {
    super('nationalConsumerPriceIndex');
  }
}
