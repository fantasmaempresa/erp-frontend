import { Pagination } from '../../core/interfaces/Pagination.model';
import { ProjectQuoteDto } from '../../data/dto/ProjectQuote.dto';

export interface QuotesState {
  quotes: Pagination<ProjectQuoteDto> | null;
}

export const quotesInitialState: QuotesState = {
  quotes: null,
};
