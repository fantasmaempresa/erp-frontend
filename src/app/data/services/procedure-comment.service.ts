import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { ProcedureCommentDto } from '../dto/ProcedureComment.dto';

@Injectable({
  providedIn: 'root',
})
export class ProcedureCommentService extends CrudService<
  ProcedureCommentDto,
  Pagination<ProcedureCommentDto>
> {
  constructor() {
    super('procedureComment');
  }
}
