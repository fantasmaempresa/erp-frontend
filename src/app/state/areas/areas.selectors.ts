import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AreasState } from './areas.state';

const selectAreasState = createFeatureSelector<AreasState>('areas');

export const selectAreas = createSelector(selectAreasState, (state) => {
  return state.areas;
});
