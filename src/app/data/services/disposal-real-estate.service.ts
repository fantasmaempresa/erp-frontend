import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { DisposalRealEstateDto } from '../dto/DisposalRealEstate.dto';

@Injectable({
  providedIn: 'root',
})
export class DisposalRealEstateService extends CrudService<
  DisposalRealEstateDto,
  Pagination<DisposalRealEstateDto>
> {
  constructor() {
    super('disposalRealEstate');
  }
}
