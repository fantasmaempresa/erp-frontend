import { createReducer, on } from '@ngrx/store';
import { ConceptsState, initialState } from './concepts.state';
import * as ConceptActions from './concepts.actions';

export const conceptReducer = createReducer(
  initialState,
  on(ConceptActions.loadConcepts, (state): ConceptsState => state),
  on(
    ConceptActions.loadConceptsSuccess,
    (state, { concepts }): ConceptsState => {
      return {
        ...state,
        concepts,
      };
    },
  ),
  on(ConceptActions.emptyConceptList, (): ConceptsState => {
    return initialState;
  }),
);
