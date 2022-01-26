import { Pagination } from '../../core/interfaces/Pagination.model';
import { QuoteStatus } from '../../data/models/QuoteStatus.model';

export interface QuoteStatusState {
  quote_status: Pagination<QuoteStatus> | null;
}

export const quoteStatusInitialState: QuoteStatusState = {
  quote_status: null,
};
