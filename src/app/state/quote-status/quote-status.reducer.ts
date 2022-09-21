import { Action, createReducer, on } from '@ngrx/store';
import {
  quoteStatusInitialState,
  QuoteStatusState,
} from './quote-status.state';
import * as QuoteStatusActions from './quote-status.actions';

const QuoteStatusReducer = createReducer(
  quoteStatusInitialState,
  on(QuoteStatusActions.loadQuoteStatuses, (state) => state),
  on(
    QuoteStatusActions.loadQuoteStatusesSucess,
    (state: QuoteStatusState, { quote_status }) => {
      return {
        ...state,
        quote_status,
      };
    },
  ),
  on(QuoteStatusActions.emptyQuoteStatusList, (state) => {
    return quoteStatusInitialState;
  }),
);

export function quoteStatusReducer(
  state = quoteStatusInitialState,
  action: Action,
) {
  return QuoteStatusReducer(state, action);
}
