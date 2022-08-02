import { Pagination } from '../../core/interfaces/Pagination.model';
import { QuoteTemplate } from '../../data/dto/QuoteTemplate.dto';

export interface QuoteTemplateState {
  quote_templates: Pagination<QuoteTemplate> | null;
}

export const quoteTemplateInitialState: QuoteTemplateState = {
  quote_templates: null,
};
