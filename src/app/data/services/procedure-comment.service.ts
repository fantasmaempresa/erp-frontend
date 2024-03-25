import { Injectable } from '@angular/core';
import { CrudService, Pagination, ViewContextService } from 'o2c_core';
import { ProcedureCommentDto } from '../dto/ProcedureComment.dto';
import { HttpParams } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProcedureCommentService extends CrudService<
  ProcedureCommentDto,
  Pagination<ProcedureCommentDto>
> {
  constructor(private contextService: ViewContextService) {
    super('procedureComment');
  }

  fetchAll(params?: HttpParams | undefined): Observable<Pagination<ProcedureCommentDto>> {
   return this.contextService.injector$.pipe(
      map((injector) => injector.get(ActivatedRoute)),
      map((route: ActivatedRoute) => route.snapshot.parent?.params.id ?? 0),
      map(
        (procedureId) =>
          new HttpParams({
            fromObject: { procedure_id: `${procedureId}` },
          }),
      ),
      switchMap((p) => super.fetchAll(p)),
    ); 
  }
}
