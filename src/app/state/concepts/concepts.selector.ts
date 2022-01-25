import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConceptsState } from './concepts.state';

const selectConcepsState = createFeatureSelector<ConceptsState>('concepts');

export const selectConcepts = createSelector(selectConcepsState, (state) => {
  return state.concepts;
});
