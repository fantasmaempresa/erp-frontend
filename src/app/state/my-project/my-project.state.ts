import { Pagination } from '../../core/interfaces';
import { MyProjectDto } from '../../data/dto';

export interface MyProjectState {
  myProjects: Pagination<MyProjectDto> | null;
}

export const initialState: MyProjectState = {
  myProjects: null,
};
