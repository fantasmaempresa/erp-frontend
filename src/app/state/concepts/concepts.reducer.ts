import { Action, createReducer, on } from '@ngrx/store';
import { conceptsInitialState, ConceptsState } from './concepts.state';
import * as ConceptActions from './concepts.actions';

const ConceptsReducer = createReducer(
  conceptsInitialState,
  on(ConceptActions.loadConcepts, (state) => state),
  on(
    ConceptActions.loadConceptsSuccess,
    (state: ConceptsState, { concepts }) => {
      return {
        ...state,
        concepts,
      };
    },
  ),
  on(ConceptActions.emptyConceptList, (state) => {
    return conceptsInitialState;
  }),
);

export function conceptReducer(state = conceptsInitialState, action: Action) {
  return ConceptsReducer(state, action);
}
