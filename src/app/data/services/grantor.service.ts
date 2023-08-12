import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { GrantorDto } from '../dto/Grantor.dto';

@Injectable({
  providedIn: 'root',
})
export class GrantorService extends CrudService<
  GrantorDto,
  Pagination<GrantorDto>
> {
  constructor() {
    super('grantors');
  }
}
