import { Pagination } from '../../core/interfaces';
import { ProcessDto } from '../../data/dto';

export interface ProcessState {
  processes: Pagination<ProcessDto> | null;
}

export const initialState: ProcessState = {
  processes: null,
};
