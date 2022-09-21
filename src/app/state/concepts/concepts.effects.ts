import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConceptService } from '../../data/services/concept.service';
import {
  loadConcepts,
  loadConceptsSuccess,
  loadNextPageOfConcepts,
} from './concepts.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class ConceptsEffects {
  constructor(
    private actions$: Actions,
    private conceptService: ConceptService,
  ) {}

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
}
