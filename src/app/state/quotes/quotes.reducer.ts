import { Action, createReducer, on } from '@ngrx/store';
import * as QuotesActions from './quotes.actions';
import { quotesInitialState, QuotesState } from './quotes.state';

const QuotesReducer = createReducer(
  quotesInitialState,
  on(QuotesActions.loadQuotes, (state) => state),
  on(QuotesActions.loadQuotesSuccess, (state: QuotesState, { quotes }) => {
    return {
      ...state,
      quotes,
    };
  }),
  on(QuotesActions.emptyQuoteList, (state) => {
    return quotesInitialState;
  }),
);

export function quotesReducer(state = quotesInitialState, action: Action) {
  return QuotesReducer(state, action);
}
