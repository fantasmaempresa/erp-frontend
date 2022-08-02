import { createAction, props } from '@ngrx/store';
import { MyProjectModel } from '../../data/models/MyProject.model';
import { Pagination } from '../../core/interfaces/Pagination.model';

export enum MyProjectActions {
  LOAD_MY_PROJECTS = '[MyProjects] Load myProjects',
  LOAD_MY_PROJECTS_SUCCESS = '[MyProjects] Load myProjects success',
  LOAD_NEXT_PAGE = '[MyProjects] Load next page',
  EMPTY_MY_PROJECT_LIST = '[MyProjects] Empty client list',
}

export const loadMyProjects = createAction(MyProjectActions.LOAD_MY_PROJECTS);
export const loadMyProjectsSuccess = createAction(
  MyProjectActions.LOAD_MY_PROJECTS_SUCCESS,
  props<{ myProjects: Pagination<MyProjectModel> }>(),
);

export const loadNextPageOfMyProjects = createAction(
  MyProjectActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);

export const emptyProjectList = createAction(MyProjectActions.EMPTY_MY_PROJECT_LIST);
