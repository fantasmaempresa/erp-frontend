import { Pagination } from '../../core/interfaces/Pagination.model';
import { WorkArea } from '../../data/models/WorkArea.model';

export interface AreasState {
  areas: Pagination<WorkArea> | null;
}

export const areasInitialState: AreasState = {
  areas: null,
};
