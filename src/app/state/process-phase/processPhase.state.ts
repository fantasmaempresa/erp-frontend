import { Pagination } from '../../core/interfaces/Pagination.model';
import { ProcessPhaseDto } from '../../data/dto/ProcessPhase.dto';

export interface ProcessPhaseState {
  processPhases: Pagination<ProcessPhaseDto> | null;
}

export const initialState: ProcessPhaseState = {
  processPhases: null,
};
