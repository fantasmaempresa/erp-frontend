import { Action, createReducer, on } from '@ngrx/store';
import { areasInitialState, AreasState } from './areas.state';
import * as AreasActions from './areas.actions';

const AreasReducer = createReducer(
  areasInitialState,
  on(AreasActions.loadAreas, (state) => state),
  on(AreasActions.loadAreasSuccess, (state: AreasState, { areas }) => {
    return {
      ...state,
      areas,
    };
  }),
  on(AreasActions.emptyAreaList, (state) => {
    return areasInitialState;
  }),
);

export function areasReducer(state = areasInitialState, action: Action) {
  return AreasReducer(state, action);
}
