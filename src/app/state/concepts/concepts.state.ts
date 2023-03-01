import { Pagination } from '../../core/interfaces/Pagination.model';
import { ConceptDto } from '../../data/dto/Concept.dto';

export interface ConceptsState {
  concepts: Pagination<ConceptDto> | null;
}

export const initialState: ConceptsState = {
  concepts: null,
};
