import { viewCrud, viewLabel, viewMapTo } from 'o2c_core';
import { ProcedureCommentService } from '../services/procedure-comment.service';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { UserDto } from '../dto';
import { DatePipe } from '@angular/common';

@viewCrud({
  classProvider: ProcedureCommentService,
  registerName: 'Comentarios',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class ProcedureCommentView {
  @viewLabel('Comentario')
  comment: string;

  @viewLabel('Usuario que creó el comentario')
  @viewMapTo((value: any) => value?.name)
  user: UserDto;

  @viewLabel('Fecha')
  @viewMapTo((value: any) => {
    const datePipe = new DatePipe('en-MX');
    return datePipe.transform(value, 'dd-MM-yyyy HH:mm:ss');
  })
  created_at?: Date;

  constructor(comment: string, user: UserDto, created_at: Date) {
    this.comment = comment;
    this.user = user;
    this.created_at = created_at;
  }
}
