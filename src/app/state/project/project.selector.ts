import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './project.state';

const selectProjectState = createFeatureSelector<ProjectState>('projects');

export const selectProjects = createSelector(selectProjectState, (state) => {
  return state.projects;
});
