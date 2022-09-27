import { createReducer, on } from '@ngrx/store';
import { initialState, MyProjectState } from './my-project.state';
import * as MyProjectActions from './my-project.actions';

export const myProjectReducer = createReducer(
  initialState,
  on(MyProjectActions.loadMyProjects, (state): MyProjectState => state),
  on(
    MyProjectActions.loadMyProjectsSuccess,
    (state: MyProjectState, { myProjects }): MyProjectState => {
      return {
        ...state,
        myProjects,
      };
    },
  ),
  on(MyProjectActions.emptyProjectList, (): MyProjectState => {
    return initialState;
  }),
);
