import { Pagination } from '../../core/interfaces/Pagination.model';
import { WorkAreaDto } from '../../data/dto/WorkArea.dto';

export interface AreasState {
  areas: Pagination<WorkAreaDto> | null;
}

export const areasInitialState: AreasState = {
  areas: null,
};
