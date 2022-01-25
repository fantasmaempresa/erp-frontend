import { Pagination } from '../../core/interfaces/Pagination.model';
import { Concept } from '../../data/models/Concept.model';

export interface ConceptsState {
  concepts: Pagination<Concept> | null;
}

export const conceptsInitialState: ConceptsState = {
  concepts: null,
};
