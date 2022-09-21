import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuoteStatusState } from './quote-status.state';

const selectQuoteStatusState =
  createFeatureSelector<QuoteStatusState>('quote_status');

export const selectQuoteStatus = createSelector(
  selectQuoteStatusState,
  (state) => {
    return state.quote_status;
  },
);
