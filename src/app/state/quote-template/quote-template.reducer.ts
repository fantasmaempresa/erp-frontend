import { Action, createReducer, on } from '@ngrx/store';
import { quoteTemplateInitialState, QuoteTemplateState } from './quote-template.state';
import * as QuoteTemplateActions from './quote-template.actions';

const QuoteTemplateReducer = createReducer(
  quoteTemplateInitialState,
  on(QuoteTemplateActions.loadQuoteTemplates, (state) => state),
  on(
    QuoteTemplateActions.loadQuoteTemplatesSuccess,
    (state: QuoteTemplateState, { quote_templates }) => {
      return {
        ...state,
        quote_templates,
      };
    },
  ),
  on(QuoteTemplateActions.emptyQuoteTemplatesList, () => quoteTemplateInitialState),
);

export function quoteTemplateReducer(state = quoteTemplateInitialState, action: Action) {
  return QuoteTemplateReducer(state, action);
}
