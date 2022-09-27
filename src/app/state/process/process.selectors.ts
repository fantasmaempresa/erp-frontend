import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProcessState } from './process.state';

const selectProcessState = createFeatureSelector<ProcessState>('processes');

export const selectProcess = createSelector(selectProcessState, (state) => {
  return state.processes;
});
