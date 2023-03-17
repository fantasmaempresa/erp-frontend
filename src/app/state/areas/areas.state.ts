import { Pagination } from '../../core/interfaces';
import { WorkAreaDto } from '../../data/dto';

export interface AreasState {
  areas: Pagination<WorkAreaDto> | null;
}

export const areasInitialState: AreasState = {
  areas: null,
};
