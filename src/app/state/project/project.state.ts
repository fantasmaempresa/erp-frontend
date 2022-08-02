import { Pagination } from '../../core/interfaces/Pagination.model';
import { ProjectDto } from '../../data/dto/Project.dto';

export interface ProjectState {
  projects: Pagination<ProjectDto> | null;
}

export const initialState: ProjectState = {
  projects: null,
};
