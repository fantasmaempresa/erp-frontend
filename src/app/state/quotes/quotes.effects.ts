import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectQuoteService } from '../../data/services/project-quote.service';
import {
  loadNextPageOfQuotes,
  loadQuotes,
  loadQuotesByStatus,
  loadQuotesSuccess,
} from './quotes.actions';
import { map, mergeMap, skipWhile, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRole } from '../auth/auth.selector';

@Injectable()
export class QuotesEffects {
  constructor(
    private actions$: Actions,
    private quotesService: ProjectQuoteService,
    private store: Store,
  ) {}

  loadQuotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadQuotes),
      switchMap(() =>
        this.store.select(selectRole).pipe(
          skipWhile((role) => role === null),
          mergeMap((role) =>
            this.quotesService
              // @ts-ignore
              .fetchAllByRole(role.id)
              .pipe(map((quotes) => loadQuotesSuccess({ quotes }))),
          ),
        ),
      ),
    );
  });

  loadQuotesByStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadQuotesByStatus),
      switchMap(({ status }) => {
        return this.quotesService
          .fetchByStatus(status)
          .pipe(map((quotes) => loadQuotesSuccess({ quotes })));
      }),
    );
  });

  loadNextPageOfQuotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNextPageOfQuotes),
      switchMap(({ page, size }) => {
        return this.quotesService
          .changePage(page, size)
          .pipe(map((quotes) => loadQuotesSuccess({ quotes })));
      }),
    );
  });
}
