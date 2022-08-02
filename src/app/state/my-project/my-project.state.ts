import { Pagination } from '../../core/interfaces/Pagination.model';
import { MyProjectDto } from '../../data/dto/MyProject.dto';

export interface MyProjectState {
  myProjects: Pagination<MyProjectDto> | null;
}

export const initialState: MyProjectState = {
  myProjects: null,
};
