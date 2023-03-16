import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuoteTemplateService } from '../../data/services/quote-template.service';
import {
  loadQuoteTemplates,
  loadQuoteTemplatesSuccess,
} from './quote-template.actions';
import { map, mergeMap } from 'rxjs';
import { laodNextPageOfQuoteStatus } from '../quote-status/quote-status.actions';

@Injectable()
export class QuoteTemplateEffects {
  loadQuoteTemplate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadQuoteTemplates),
      mergeMap(() => {
        return this.quoteTemplateService
          .fetchAll()
          .pipe(
            map((quote_templates) =>
              loadQuoteTemplatesSuccess({ quote_templates }),
            ),
          );
      }),
    );
  });
  loadNextPageOfQuoteTemplates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(laodNextPageOfQuoteStatus),
      mergeMap(({ page, size }) => {
        return this.quoteTemplateService
          .changePage(page, size)
          .pipe(
            map((quote_templates) =>
              loadQuoteTemplatesSuccess({ quote_templates }),
            ),
          );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private quoteTemplateService: QuoteTemplateService,
  ) {}
}
