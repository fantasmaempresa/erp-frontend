import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { QuoteStatus } from '../../data/models/QuoteStatus.model';

export enum QuoteStatusActions {
  LOAD_QUOTE_STATUS = '[Quote status] Load quote status',
  LOAD_QUOTE_STATUS_SUCCESS = '[Quote status] Load quote status success',
  LOAD_NEXT_PAGE = '[Quote status] Load next page',
  EMPTY_LIST = '[Quote status] Empty quote status list',
}

export const loadQuoteStatuses = createAction(QuoteStatusActions.LOAD_QUOTE_STATUS);
export const loadQuoteStatusesSucess = createAction(
  QuoteStatusActions.LOAD_QUOTE_STATUS_SUCCESS,
  props<{ quote_status: Pagination<QuoteStatus> }>(),
);
export const laodNextPageOfQuoteStatus = createAction(
  QuoteStatusActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);
export const emptyQuoteStatusList = createAction(QuoteStatusActions.EMPTY_LIST);
