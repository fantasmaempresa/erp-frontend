import { Pagination } from '../../core/interfaces/Pagination.model';
import { ProjectQuote } from '../../data/models/ProjectQuote.model';

export interface QuotesState {
  quotes: Pagination<ProjectQuote> | null;
}

export const quotesInitialState: QuotesState = {
  quotes: null,
};
