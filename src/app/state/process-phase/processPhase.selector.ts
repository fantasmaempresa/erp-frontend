import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProcessPhaseState } from './processPhase.state';

const selectProcessPhaseState = createFeatureSelector<ProcessPhaseState>('processPhases');

export const selectProcessPhase = createSelector(selectProcessPhaseState, (state) => {
  return state.processPhases;
});
