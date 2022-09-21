import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyProjectState } from './my-project.state';

const selectMyProjectState =
  createFeatureSelector<MyProjectState>('myProjects');

export const selectMyProjects = createSelector(
  selectMyProjectState,
  (state) => {
    return state.myProjects;
  },
);
