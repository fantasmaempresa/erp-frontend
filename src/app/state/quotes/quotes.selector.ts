import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuotesState } from './quotes.state';

const selectQuotesState = createFeatureSelector<QuotesState>('quotes');

export const selectQuotes = createSelector(selectQuotesState, (state) => {
  return state.quotes;
});
