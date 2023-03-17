import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConceptServiceOld } from '../../data/services';
import {
  loadConcepts,
  loadConceptsSuccess,
  loadNextPageOfConcepts,
} from './concepts.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class ConceptsEffects {
  loadConcepts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadConcepts),
      mergeMap(() => {
        return this.conceptService
          .fetchAll()
          .pipe(map((concepts) => loadConceptsSuccess({ concepts })));
      }),
    );
  });

  loadNextPageOfConcepts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNextPageOfConcepts),
      mergeMap(({ page, size }) => {
        return this.conceptService
          .changePage(page, size)
          .pipe(map((concepts) => loadConceptsSuccess({ concepts })));
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private conceptService: ConceptServiceOld,
  ) {}
}
