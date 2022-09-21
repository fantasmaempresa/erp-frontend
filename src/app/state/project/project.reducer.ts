import { Action, createReducer, on } from '@ngrx/store';
import { initialState, ProjectState } from './project.state';
import * as ProjectActions from './project.actions';

const ProjectReducer = createReducer(
  initialState,
  on(ProjectActions.loadProjects, (state) => state),
  on(
    ProjectActions.loadProjectsSuccess,
    (state: ProjectState, { projects }) => {
      return {
        ...state,
        projects,
      };
    },
  ),
  on(ProjectActions.emptyProjectList, () => {
    return initialState;
  }),
);

export function projectReducer(state = initialState, action: Action) {
  return ProjectReducer(state, action);
}
