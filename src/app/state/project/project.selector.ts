import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './project.state';

const selectProjectState = createFeatureSelector<ProjectState>('projects');

export const selectClients = createSelector(selectProjectState, (state) => {
  return state.projects;
});
