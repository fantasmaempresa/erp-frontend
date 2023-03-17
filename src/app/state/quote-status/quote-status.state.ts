import { Pagination } from '../../core/interfaces';
import { QuoteStatusDto } from '../../data/dto';

export interface QuoteStatusState {
  quote_status: Pagination<QuoteStatusDto> | null;
}

export const quoteStatusInitialState: QuoteStatusState = {
  quote_status: null,
};
