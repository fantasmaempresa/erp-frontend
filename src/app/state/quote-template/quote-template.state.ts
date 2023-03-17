import { Pagination } from '../../core/interfaces';
import { QuoteTemplate } from '../../data/dto';

export interface QuoteTemplateState {
  quote_templates: Pagination<QuoteTemplate> | null;
}

export const quoteTemplateInitialState: QuoteTemplateState = {
  quote_templates: null,
};
