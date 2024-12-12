import { Injectable } from '@angular/core';
import { CrudService, Pagination, ViewContextService } from 'o2c_core';
import { ReminderDto } from '../dto/Reminder.dto';
import { map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReminderService extends CrudService<
  ReminderDto,
  Pagination<ReminderDto>
> {

  PROCESSING_INCOME_CONFIG = 1;
  PROCEDURE_CONFIG = 2;
  GENERAL_CONFIG = 3;

  constructor(
    private contextService: ViewContextService
  ) {
    super('reminder');
  }

  fetchAll(): Observable<Pagination<ReminderDto>> {
    return this.contextService.injector$.pipe(
      map((injector) => injector.get(ActivatedRoute)),
      map((route: ActivatedRoute) => {
        let procedure_id = NaN;
        let idProcessingIncome = NaN;
        let id = NaN;
        id = Number(route.snapshot.params.idReminder);
        procedure_id = Number(route.snapshot.params.procedureId);
        idProcessingIncome = Number(route.snapshot.params.idProcessingIncome);
        let data = {
          client_id: 0,
          view: ''
        };

        if (!isNaN(procedure_id)) {
          data.client_id = procedure_id;
          data.view = 'Procedures';
        } else if (!isNaN(idProcessingIncome)) {
          data.client_id = idProcessingIncome;
          data.view = 'ProcessingIncome';
        }

        return data;
      }),
      map(
        ({ client_id, view }) =>
          new HttpParams({
            fromObject: { client_id: `${client_id}`, view: `${view}` },
          }),
      ),
      switchMap((p) => super.fetchAll(p)),
    );
  }


  enableDisable(id: number) : Observable<ReminderDto>
  {
    return this._http.get<ReminderDto>(`${this._base}/enableDisable/${id}`);
  }


}
