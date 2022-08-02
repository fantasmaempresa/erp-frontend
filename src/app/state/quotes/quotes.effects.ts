import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectQuoteService } from '../../data/services/project-quote.service';
import {
  loadNextPageOfQuotes,
  loadQuotes,
  loadQuotesByStatus,
  loadQuotesSuccess,
} from './quotes.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class QuotesEffects {
  constructor(private actions$: Actions, private quotesService: ProjectQuoteService) {}

  loadQuotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadQuotes),
      mergeMap(() => {
        return this.quotesService.fetchAll().pipe(map((quotes) => loadQuotesSuccess({ quotes })));
      }),
    );
  });

  loadQuotesByStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadQuotesByStatus),
      mergeMap(({ status }) => {
        return this.quotesService
          .fetchByStatus(status)
          .pipe(map((quotes) => loadQuotesSuccess({ quotes })));
      }),
    );
  });

  loadNextPageOfQuotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNextPageOfQuotes),
      mergeMap(({ page, size }) => {
        return this.quotesService
          .changePage(page, size)
          .pipe(map((quotes) => loadQuotesSuccess({ quotes })));
      }),
    );
  });
}
