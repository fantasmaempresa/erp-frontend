import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuoteTemplateState } from './quote-template.state';

const selectQuoteTemplateState =
  createFeatureSelector<QuoteTemplateState>('quote_templates');

export const selectQuoteTemplates = createSelector(
  selectQuoteTemplateState,
  (state) => state.quote_templates,
);
