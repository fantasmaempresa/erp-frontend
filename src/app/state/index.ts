import { ActionReducerMap } from '@ngrx/store';
import { AuthState, initialState } from './auth/auth.state';
import { authReducer } from './auth/auth.reducer';
import { ClientsState, initialState as clientsInitialState } from './clients/clients.state';
import { clientReducer } from './clients/clients.reducer';
import { initialState as staffInitialState, StaffState } from './staff/staff.state';
import { staffReducer } from './staff/staff.reducer';
import { areasInitialState, AreasState } from './areas/areas.state';
import { areasReducer } from './areas/areas.reducer';
import { conceptsInitialState, ConceptsState } from './concepts/concepts.state';
import { conceptReducer } from './concepts/concepts.reducer';
import { quoteStatusInitialState, QuoteStatusState } from './quote-status/quote-status.state';
import { quoteStatusReducer } from './quote-status/quote-status.reducer';
import { quotesInitialState, QuotesState } from './quotes/quotes.state';
import { quotesReducer } from './quotes/quotes.reducer';
import { dynamicFormInitialState, DynamicFormState } from './dynamic-form/dynamic-form.state';
import { dynamicFormReducer } from './dynamic-form/dynamic-form.reducer';

export interface AppState {
  auth: AuthState;
  clients: ClientsState;
  staff: StaffState;
  areas: AreasState;
  concepts: ConceptsState;
  quote_status: QuoteStatusState;
  quotes: QuotesState;
  dynamicForm: DynamicFormState;
}

export const initialAppState: AppState = {
  auth: initialState,
  clients: clientsInitialState,
  staff: staffInitialState,
  areas: areasInitialState,
  concepts: conceptsInitialState,
  quote_status: quoteStatusInitialState,
  quotes: quotesInitialState,
  dynamicForm: dynamicFormInitialState,
};

export function getInitialAppState(): AppState {
  return initialAppState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  clients: clientReducer,
  staff: staffReducer,
  areas: areasReducer,
  concepts: conceptReducer,
  quote_status: quoteStatusReducer,
  quotes: quotesReducer,
  dynamicForm: dynamicFormReducer,
};
