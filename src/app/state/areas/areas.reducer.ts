import { createReducer, on } from '@ngrx/store';
import { areasInitialState, AreasState } from './areas.state';
import * as AreasActions from './areas.actions';

export const areasReducer = createReducer(
  areasInitialState,
  on(AreasActions.loadAreas, (state): AreasState => state),
  on(AreasActions.loadAreasSuccess, (state, { areas }): AreasState => {
    return {
      ...state,
      areas,
    };
  }),
  on(AreasActions.emptyAreaList, (): AreasState => {
    return areasInitialState;
  }),
);
