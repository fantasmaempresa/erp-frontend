import { Pagination } from '../../core/interfaces/Pagination.model';
import { Process } from '../../data/models/Process.model';

export interface ProcessState {
  processes: Pagination<Process> | null;
}

export const initialState: ProcessState = {
  processes: null,
};
