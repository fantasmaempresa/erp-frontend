import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { MovementTrackingDto } from '../dto/MovementTracking.dto';

@Injectable({
  providedIn: 'root'
})
export class MovementTrackingService extends CrudService<
  MovementTrackingDto,
  Pagination<MovementTrackingDto>
> {
  constructor() {
    super('movementTracking');
  }
}
