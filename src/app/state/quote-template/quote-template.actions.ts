import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { QuoteTemplate } from '../../data/dto/QuoteTemplate.dto';

export enum QuoteTemplateActions {
  LOAD_QUOTE_TEMPLATES = '[Quote Template] Load quote template',
  LOAD_QUOTE_TEMPLATES_SUCCESS = '[Quote Template] Load quote template success',
  LOAD_NEXT_PAGE = '[Quote Template] Load next page',
  EMPTY_LIST = '[Quote Template] Empty quote templates list',
}

export const loadQuoteTemplates = createAction(
  QuoteTemplateActions.LOAD_QUOTE_TEMPLATES,
);
export const loadQuoteTemplatesSuccess = createAction(
  QuoteTemplateActions.LOAD_QUOTE_TEMPLATES_SUCCESS,
  props<{ quote_templates: Pagination<QuoteTemplate> }>(),
);
export const loadNextPageOfQuoteTemplates = createAction(
  QuoteTemplateActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);
export const emptyQuoteTemplatesList = createAction(
  QuoteTemplateActions.EMPTY_LIST,
);
