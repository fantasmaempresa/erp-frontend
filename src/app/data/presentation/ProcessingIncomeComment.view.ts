import { viewCrud, viewLabel, viewMapTo } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { UserDto } from '../dto';
import { ProcessingIncomeCommentService } from '../services/processing-income-comment.service';
import { DatePipe } from '@angular/common';

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

  @viewLabel('Fecha')
  @viewMapTo((value: any) => {
    const datePipe = new DatePipe('en-MX');
    return datePipe.transform(value, 'dd-MM-yyyy HH:mm:ss');
  })
  created_at?: Date;

  constructor(comment: string, user: UserDto, created_at?: Date) {
    this.comment = comment;
    this.user = user;
    this.user = user;
    this.created_at = created_at;
  }
}
