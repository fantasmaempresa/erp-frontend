import { Action, createReducer, on } from '@ngrx/store';
import { initialState, ProcessPhaseState } from './process-phase.state';
import * as ProcessPhaseActions from './process-phase.actions';

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
  on(ProcessPhaseActions.emptyClientList, () => {
    return initialState;
  }),
);

export function processPhaseReducer(state = initialState, action: Action) {
  return ProcessPhaseReducer(state, action);
}
