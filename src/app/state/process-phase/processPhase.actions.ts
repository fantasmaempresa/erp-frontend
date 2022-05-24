import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { ProcessPhase } from '../../data/models/ProcessPhase.model';

export enum ProcessPhaseActions {
  LOAD_PROCESS_PHASE = '[ProcessPhase] Load processPhase',
  LOAD_PROCESS_PHASE_SUCCESS = '[ProcessPhase] Load processPhase success',
  LOAD_NEXT_PAGE = '[ProcessPhase] Load next page',
  ADD_PROCESS_PHASE = '[ProcessPhase] Add processPhase',
  EMPTY_PROCESS_PHASE_LIST = '[ProcessPhase] Empty processPhase list',
}

export const loadProcessPhase = createAction(ProcessPhaseActions.LOAD_PROCESS_PHASE);
export const loadProcessPhaseSuccess = createAction(
  ProcessPhaseActions.LOAD_PROCESS_PHASE_SUCCESS,
  props<{ processPhases: Pagination<ProcessPhase> }>(),
);

export const loadNextPageOfProcessPhase = createAction(
  ProcessPhaseActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);

export const emptyClientList = createAction(ProcessPhaseActions.EMPTY_PROCESS_PHASE_LIST);
