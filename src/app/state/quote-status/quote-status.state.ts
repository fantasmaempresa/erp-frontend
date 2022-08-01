import { Pagination } from '../../core/interfaces/Pagination.model';
import { QuoteStatusDto } from '../../data/dto/QuoteStatus.dto';

export interface QuoteStatusState {
  quote_status: Pagination<QuoteStatusDto> | null;
}

export const quoteStatusInitialState: QuoteStatusState = {
  quote_status: null,
};
