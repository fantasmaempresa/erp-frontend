import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { Project } from '../../data/models/Project.model';

export enum ProjectActions {
  LOAD_PROJECTS = '[Projects] Load projects',
  LOAD_PROJECTS_SUCCESS = '[Projects] Load projects success',
  LOAD_NEXT_PAGE = '[Projects] Load next page',
  ADD_PROJECT = '[Projects] Add client',
  EMPTY_PROJECT_LIST = '[Projects] Empty client list',
}

export const loadProjects = createAction(ProjectActions.LOAD_PROJECTS);
export const loadProjectsSuccess = createAction(
  ProjectActions.LOAD_PROJECTS_SUCCESS,
  props<{ projects: Pagination<Project> }>(),
);

export const loadNextPageOfProjects = createAction(
  ProjectActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);

export const emptyProjectList = createAction(ProjectActions.EMPTY_PROJECT_LIST);
