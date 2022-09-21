import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { ConceptDto } from '../../data/dto/Concept.dto';

export enum ConceptsActions {
  LOAD_CONCEPTS = '[Concepts] Load concepts',
  LOAD_CONCEPTS_SUCCESS = '[Concepts] Load concepts success',
  LOAD_NEXT_PAGE = '[Concepts] Load next page',
  EMPTY_CONCEPT_LIST = '[Concepts] Empty concept list',
  ADD_CONCEPT = '[Concepts] Add concept',
}

export const loadConcepts = createAction(ConceptsActions.LOAD_CONCEPTS);
export const loadConceptsSuccess = createAction(
  ConceptsActions.LOAD_CONCEPTS_SUCCESS,
  props<{ concepts: Pagination<ConceptDto> }>(),
);
export const loadNextPageOfConcepts = createAction(
  ConceptsActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);
export const emptyConceptList = createAction(
  ConceptsActions.EMPTY_CONCEPT_LIST,
);
