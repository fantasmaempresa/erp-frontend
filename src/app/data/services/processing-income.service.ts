import { Injectable } from '@angular/core';
import { CrudService, Pagination, ViewContextService } from 'o2c_core';
import { ProcessingIncomeDto } from '../dto/ProcessingIncome.dto';
import { HttpParams } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProcessingIncomeService extends CrudService<
  ProcessingIncomeDto,
  Pagination<ProcessingIncomeDto>
> {
  constructor(private contextService: ViewContextService) {
    super('processingIncome');
  }

  fetchAll(params?: HttpParams | undefined): Observable<Pagination<ProcessingIncomeDto>> {
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


@Injectable({
  providedIn: 'root',
})
export class ProcessingIncomePhaseService extends CrudService<
  ProcessingIncomeDto,
  Pagination<ProcessingIncomeDto>
> {
  constructor(private contextService: ViewContextService) {
    super('processingIncome');
  }

  fetchAll(params?: HttpParams | undefined): Observable<Pagination<ProcessingIncomeDto>> {
    return this.contextService.injector$.pipe(
       map(() =>{
          const procedure_id = localStorage.getItem('phase_procedure_id') ?? 0;
          return new HttpParams({
            fromObject: { procedure_id: `${procedure_id}`},
          });
        }
       ),
       switchMap((p) => super.fetchAll(p)),
     ); 
   }
}

