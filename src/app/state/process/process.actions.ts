import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { Process } from '../../data/models/Process.model';

export enum ProcessActions {
  LOAD_PROCESS = '[Process] Load process',
  LOAD_PROCESS_SUCCESS = '[Process] Load process success',
  LOAD_NEXT_PAGE = '[Process] Load next page',
  ADD_PROCESS = '[Process] Add process',
  EMPTY_PROCESS_LIST = '[Process] Empty process list',
}

export const loadProcess = createAction(ProcessActions.LOAD_PROCESS);
export const loadProcessSuccess = createAction(
  ProcessActions.LOAD_PROCESS_SUCCESS,
  props<{ processes: Pagination<Process> }>(),
);

export const loadNextPageOfProcess = createAction(
  ProcessActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);

export const emptyClientList = createAction(ProcessActions.EMPTY_PROCESS_LIST);
