import { Pagination } from '../../core/interfaces/Pagination.model';
import { ProcessDto } from '../../data/dto/Process.dto';

export interface ProcessState {
  processes: Pagination<ProcessDto> | null;
}

export const initialState: ProcessState = {
  processes: null,
};
