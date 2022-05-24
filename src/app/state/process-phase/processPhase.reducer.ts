import { Action, createReducer, on } from '@ngrx/store';
import { initialState, ProcessPhaseState } from './processPhase.state';
import * as ProcessPhaseActions from './processPhase.actions';

const ProcessPhaseReducer = createReducer(
  initialState,
  on(ProcessPhaseActions.loadProcessPhase, (state) => state),
  on(
    ProcessPhaseActions.loadProcessPhaseSuccess,
    (state: ProcessPhaseState, { processPhases }): ProcessPhaseState => ({
      ...state,
      processPhases,
    }),
  ),
  on(ProcessPhaseActions.emptyClientList, (state) => {
    return initialState;
  }),
);

export function processPhaseReducer(state = initialState, action: Action) {
  return ProcessPhaseReducer(state, action);
}
