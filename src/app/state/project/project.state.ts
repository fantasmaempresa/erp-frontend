import { Pagination } from '../../core/interfaces/Pagination.model';
import { Project } from '../../data/models/Project.model';

export interface ProjectState {
  projects: Pagination<Project> | null;
}

export const initialState: ProjectState = {
  projects: null,
};
