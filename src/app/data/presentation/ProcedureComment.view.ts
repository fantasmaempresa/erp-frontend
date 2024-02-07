import { viewCrud, viewLabel, viewMapTo } from 'o2c_core';
import { ProcedureCommentService } from '../services/procedure-comment.service';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { UserDto } from '../dto';

@viewCrud({
  classProvider: ProcedureCommentService,
  registerName: 'Comentarios',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class ProcedureCommentView {
  @viewLabel('Comentario')
  comment: string;

  @viewLabel('User')
  @viewMapTo((value: any) => value?.name)
  user: UserDto;

  constructor(comment: string, user: UserDto) {
    this.comment = comment;
    this.user = user;
  }
}
