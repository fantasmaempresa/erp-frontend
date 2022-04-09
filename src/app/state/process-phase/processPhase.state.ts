import { Pagination } from '../../core/interfaces/Pagination.model';
import { ProcessPhase } from '../../data/models/ProcessPhase.model';

export interface ProcessPhaseState {
  processPhases: Pagination<ProcessPhase> | null;
}

export const initialState: ProcessPhaseState = {
  processPhases: null,
};
