import { Injectable } from '@angular/core';
import { CrudService, Pagination, ViewContextService } from 'o2c_core';
import { ProcessingIncomeCommentDto } from '../dto/ProcessingIncomeComment.dto';
import { HttpParams } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProcessingIncomeCommentService extends CrudService<
  ProcessingIncomeCommentDto,
  Pagination<ProcessingIncomeCommentDto>
> {
  constructor(private contextService: ViewContextService) {
    super('processingIncomeComment');
  }

  fetchAll(params?: HttpParams | undefined): Observable<Pagination<ProcessingIncomeCommentDto>> {
    return this.contextService.injector$.pipe(
       map((injector) => injector.get(ActivatedRoute)),
       map((route: ActivatedRoute) => route.snapshot.parent?.params.idProcessingIncome ?? 0),
       map(
         (id) =>
           new HttpParams({
             fromObject: { processing_income_id: `${id}` },
           }),
       ),
       switchMap((p) => super.fetchAll(p)),
     ); 
   }

}
