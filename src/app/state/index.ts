import { ActionReducerMap } from '@ngrx/store';
import {
  authReducer,
  AuthState,
  initialState as authInitialState,
} from './auth';
import {
  clientsReducer,
  ClientsState,
  initialState as clientsInitialState,
} from './clients';
import {
  initialState as staffInitialState,
  staffReducer,
  StaffState,
} from './staff';
import { areasInitialState, areasReducer, AreasState } from './areas';
import {
  conceptReducer,
  ConceptsState,
  initialState as conceptsInitialState,
} from './concepts';
import {
  quoteStatusInitialState,
  quoteStatusReducer,
  QuoteStatusState,
} from './quote-status';
import { quotesInitialState, quotesReducer, QuotesState } from './quotes';
import {
  initialState as notificationInitialState,
  notificationReducer,
  NotificationState,
} from './notifications';
import {
  clientsLinkReducer,
  ClientsLinkState,
  initialState as clientsLinkInitialState,
} from './clients-link';
import {
  initialState as userInitialState,
  userReducer,
  UsersState,
} from './users';
import {
  initialState as processPhaseState,
  processPhaseReducer,
  ProcessPhaseState,
} from './process-phase';
import {
  initialState as projectState,
  projectReducer,
  ProjectState,
} from './project';
import {
  initialState as processInitialState,
  processReducer,
  ProcessState,
} from './process';
import { roleReducer, rolesInitialState, RoleState } from './role';
import {
  quoteTemplateInitialState,
  quoteTemplateReducer,
  QuoteTemplateState,
} from './quote-template';
import {
  initialState as myProjectInitialState,
  myProjectReducer,
  MyProjectState,
} from './my-project';
import {
  dynamicFormReducer,
  DynamicFormState,
  initialState as dynamicFormInitialState,
} from './dynamic-form';

export interface AppState {
  roles: RoleState;
  auth: AuthState;
  clients: ClientsState;
  users: UsersState;
  clientsLink: ClientsLinkState;
  staff: StaffState;
  areas: AreasState;
  concepts: ConceptsState;
  quote_status: QuoteStatusState;
  quotes: QuotesState;
  notifications: NotificationState;
  dynamicForm: DynamicFormState;
  processPhases: ProcessPhaseState;
  processes: ProcessState;
  projects: ProjectState;
  myProjects: MyProjectState;
  quote_templates: QuoteTemplateState;
}

export const initialAppState: AppState = {
  processPhases: processPhaseState,
  processes: processInitialState,
  projects: projectState,
  myProjects: myProjectInitialState,
  notifications: notificationInitialState,
  auth: authInitialState,
  clients: clientsInitialState,
  users: userInitialState,
  clientsLink: clientsLinkInitialState,
  staff: staffInitialState,
  areas: areasInitialState,
  concepts: conceptsInitialState,
  quote_status: quoteStatusInitialState,
  quotes: quotesInitialState,
  dynamicForm: dynamicFormInitialState,
  quote_templates: quoteTemplateInitialState,
  roles: rolesInitialState,
};

export function getInitialAppState(): AppState {
  return initialAppState;
}

export const reducers: ActionReducerMap<AppState> = {
  processPhases: processPhaseReducer,
  processes: processReducer,
  projects: projectReducer,
  myProjects: myProjectReducer,
  auth: authReducer,
  clients: clientsReducer,
  users: userReducer,
  staff: staffReducer,
  areas: areasReducer,
  concepts: conceptReducer,
  quote_status: quoteStatusReducer,
  quotes: quotesReducer,
  notifications: notificationReducer,
  dynamicForm: dynamicFormReducer,
  clientsLink: clientsLinkReducer,
  quote_templates: quoteTemplateReducer,
  roles: roleReducer,
};
