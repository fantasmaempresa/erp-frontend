import { Pagination } from '../../core/interfaces';
import { ProcessPhaseDto } from '../../data/dto';

export interface ProcessPhaseState {
  processPhases: Pagination<ProcessPhaseDto> | null;
}

export const initialState: ProcessPhaseState = {
  processPhases: null,
};
