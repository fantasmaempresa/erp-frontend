import { Pagination } from '../../core/interfaces';
import { ProjectQuoteDto } from '../../data/dto';

export interface QuotesState {
  quotes: Pagination<ProjectQuoteDto> | null;
}

export const quotesInitialState: QuotesState = {
  quotes: null,
};
