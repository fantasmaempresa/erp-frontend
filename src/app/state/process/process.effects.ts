import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import {
  loadNextPageOfProcess,
  loadProcess,
  loadProcessSuccess,
} from './process.actions';
import { ProcessService } from '../../data/services/process.service';

@Injectable()
export class ProcessEffects {
  constructor(
    private actions$: Actions,
    private processService: ProcessService,
  ) {}

  loadProcessPhases$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProcess),
      mergeMap(() => {
        return this.processService
          .fetchAll()
          .pipe(map((processes) => loadProcessSuccess({ processes })));
      }),
    );
  });

  loadNextPageOfProcess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNextPageOfProcess),
      mergeMap(({ page, size }) => {
        return this.processService
          .changePage(page, size)
          .pipe(map((processes) => loadProcessSuccess({ processes })));
      }),
    );
  });
}
