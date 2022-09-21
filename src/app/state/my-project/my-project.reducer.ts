import { Action, createReducer, on } from '@ngrx/store';
import { initialState, MyProjectState } from './my-project.state';
import * as MyProjectActions from './my-project.actions';

const MyProjectReducer = createReducer(
  initialState,
  on(MyProjectActions.loadMyProjects, (state) => state),
  on(
    MyProjectActions.loadMyProjectsSuccess,
    (state: MyProjectState, { myProjects }) => {
      return {
        ...state,
        myProjects,
      };
    },
  ),
  on(MyProjectActions.emptyProjectList, (state) => {
    return initialState;
  }),
);

export function myProjectReducer(state = initialState, action: Action) {
  return MyProjectReducer(state, action);
}
