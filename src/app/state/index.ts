import { ActionReducerMap } from '@ngrx/store';
import { AuthState, initialState } from './auth/auth.state';
import { authReducer } from './auth/auth.reducer';
import {
  ClientsState,
  initialState as clientsInitialState,
} from './clients/clients.state';
import {
  initialState as staffInitialState,
  StaffState,
} from './staff/staff.state';
import { staffReducer } from './staff/staff.reducer';
import { areasInitialState, AreasState } from './areas/areas.state';
import { areasReducer } from './areas/areas.reducer';
import { conceptsInitialState, ConceptsState } from './concepts/concepts.state';
import { conceptReducer } from './concepts/concepts.reducer';
import {
  quoteStatusInitialState,
  QuoteStatusState,
} from './quote-status/quote-status.state';
import { quoteStatusReducer } from './quote-status/quote-status.reducer';
import { quotesInitialState, QuotesState } from './quotes/quotes.state';
import { quotesReducer } from './quotes/quotes.reducer';
import {
  DynamicFormState,
  initialState as dynamicFormInitialState,
} from './dynamic-form/dynamic-form.state';
import { dynamicFormReducer } from './dynamic-form/dynamic-form.reducer';
import {
  initialState as notificationInitialState,
  NotificationState,
} from './notifications/notification.state';
import { notificationReducer } from './notifications/notification.reducer';
import {
  ClientsLinkState,
  initialState as clientsLinkInitialState,
} from './clients-link/clients-link.state';
import { clientsLinkReducer } from './clients-link/clients-link.reducer';
import { clientReducer } from './clients/clients.reducer';
import { userReducer } from './users/users.reducer';
import {
  initialState as userInitialState,
  UsersState,
} from './users/users.state';
import {
  initialState as processPhaseState,
  ProcessPhaseState,
} from './process-phase/processPhase.state';
import {
  initialState as projectState,
  ProjectState,
} from './project/project.state';
import { processPhaseReducer } from './process-phase/processPhase.reducer';
import { projectReducer } from './project/project.reducer';
import {
  initialState as processInitialState,
  ProcessState,
} from './process/process.state';
import { processReducer } from './process/process.reducer';
import { rolesInitialState, RoleState } from './role/role.state';
import { roleReducer } from './role/role.reducer';
import {
  quoteTemplateInitialState,
  QuoteTemplateState,
} from './quote-template/quote-template.state';
import { quoteTemplateReducer } from './quote-template/quote-template.reducer';
import {
  initialState as myProjectInitialState,
  MyProjectState,
} from './my-project/my-project.state';
import { myProjectReducer } from './my-project/my-project.reducer';

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
  auth: initialState,
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
  clients: clientReducer,
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
