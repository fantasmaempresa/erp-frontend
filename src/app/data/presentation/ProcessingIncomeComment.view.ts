import { viewCrud, viewLabel, viewMapTo } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { UserDto } from '../dto';
import { ProcessingIncomeCommentService } from '../services/processing-income-comment.service';

@viewCrud({
  classProvider: ProcessingIncomeCommentService,
  registerName: 'Comentarios',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class ProcessingIncomeCommentView {
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
