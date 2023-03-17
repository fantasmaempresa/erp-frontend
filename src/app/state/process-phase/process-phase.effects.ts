import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import {
  loadNextPageOfProcessPhase,
  loadProcessPhase,
  loadProcessPhaseSuccess,
} from './process-phase.actions';
import { ProcessPhaseService } from '../../data/services';

@Injectable()
export class ProcessPhaseEffects {
  loadProcessPhases$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProcessPhase),
      mergeMap(() => {
        return this.phaseService
          .fetchAll()
          .pipe(
            map((processPhases) => loadProcessPhaseSuccess({ processPhases })),
          );
      }),
    );
  });

  loadNextPageOfClients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNextPageOfProcessPhase),
      mergeMap(({ page, size }) => {
        return this.phaseService
          .changePage(page, size)
          .pipe(
            map((processPhases) => loadProcessPhaseSuccess({ processPhases })),
          );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private phaseService: ProcessPhaseService,
  ) {}
}
