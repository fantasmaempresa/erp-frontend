import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { ProjectQuote } from '../../data/models/ProjectQuote.model';

export enum QuotesActions {
  LOAD_QUOTES = '[Quotes] Load quotes',
  LOAD_QUOTES_BY_STATUS = '[Quotes] Load quotes by status',
  LOAD_QUOTES_SUCCESS = '[Quotes] Load quotes success',
  LOAD_NEXT_PAGE = '[Quotes] Load next page',
  EMPTY_LIST = '[Quotes] Empty quotes list',
}

export const loadQuotes = createAction(QuotesActions.LOAD_QUOTES);

export const loadQuotesByStatus = createAction(
  QuotesActions.LOAD_QUOTES_BY_STATUS,
  props<{ status: string }>(),
);

export const loadQuotesSuccess = createAction(
  QuotesActions.LOAD_QUOTES_SUCCESS,
  props<{ quotes: Pagination<ProjectQuote> }>(),
);
export const loadNextPageOfQuotes = createAction(
  QuotesActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);
export const emptyQuoteList = createAction(QuotesActions.EMPTY_LIST);
