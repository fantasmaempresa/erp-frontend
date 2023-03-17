import { Pagination } from '../../core/interfaces';
import { ProjectDto } from '../../data/dto';

export interface ProjectState {
  projects: Pagination<ProjectDto> | null;
}

export const initialState: ProjectState = {
  projects: null,
};
