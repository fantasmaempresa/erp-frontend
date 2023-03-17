import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuoteStatusService } from '../../data/services/quote-status.service';
import {
  laodNextPageOfQuoteStatus,
  loadQuoteStatuses,
  loadQuoteStatusesSucess,
} from './quote-status.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class QuoteStatusEffects {
  loadQuoteStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadQuoteStatuses),
      mergeMap(() => {
        return this.quoteStatusService
          .fetchAll()
          .pipe(
            map((quote_status) => loadQuoteStatusesSucess({ quote_status })),
          );
      }),
    );
  });

  loadNextPageOfQuoteStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(laodNextPageOfQuoteStatus),
      mergeMap(({ page, size }) => {
        return this.quoteStatusService
          .changePage(page, size)
          .pipe(
            map((quote_status) => loadQuoteStatusesSucess({ quote_status })),
          );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private quoteStatusService: QuoteStatusService,
  ) {}
}
