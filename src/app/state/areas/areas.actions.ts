import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { WorkArea } from '../../data/models/WorkArea.model';

export enum AreasActions {
  LOAD_AREAS = '[Areas] Load areas',
  LOAD_AREAS_SUCCESS = '[Areas] Load areas success',
  LOAD_NEXT_PAGE = '[Areas] Load next page',
  EMPTY_AREA_LIST = '[Areas] Empty area list',
  ADD_CLIENT = '[Areas] Add client',
}

export const loadAreas = createAction(AreasActions.LOAD_AREAS);
export const loadAreasSuccess = createAction(
  AreasActions.LOAD_AREAS_SUCCESS,
  props<{ areas: Pagination<WorkArea> }>(),
);

export const loadNextPageOfAreas = createAction(
  AreasActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);
export const emptyAreaList = createAction(AreasActions.EMPTY_AREA_LIST);
