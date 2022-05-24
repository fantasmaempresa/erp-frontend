import { Action, createReducer, on } from '@ngrx/store';
import { initialState, ProcessState } from './process.state';
import * as ProcessActions from './process.actions';

const ProcessReducer = createReducer(
  initialState,
  on(ProcessActions.loadProcess, (state) => state),
  on(
    ProcessActions.loadProcessSuccess,
    (state: ProcessState, { processes }): ProcessState => ({
      ...state,
      processes,
    }),
  ),
  on(ProcessActions.emptyClientList, () => {
    return initialState;
  }),
);

export function processReducer(state = initialState, action: Action) {
  return ProcessReducer(state, action);
}
