import { Pagination } from '../../core/interfaces/Pagination.model';
import { MyProjectModel } from '../../data/models/MyProject.model';

export interface MyProjectState {
  myProjects: Pagination<MyProjectModel> | null;
}

export const initialState: MyProjectState = {
  myProjects: null,
};
