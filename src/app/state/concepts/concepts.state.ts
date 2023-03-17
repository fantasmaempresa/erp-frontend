import { Pagination } from '../../core/interfaces';
import { ConceptDto } from '../../data/dto';

export interface ConceptsState {
  concepts: Pagination<ConceptDto> | null;
}

export const initialState: ConceptsState = {
  concepts: null,
};
