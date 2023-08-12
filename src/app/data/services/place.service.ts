import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { PlaceDto } from '../dto/Place.dto';

@Injectable({
  providedIn: 'root',
})
export class PlaceService extends CrudService<PlaceDto, Pagination<PlaceDto>> {
  constructor() {
    super('places');
  }
}
